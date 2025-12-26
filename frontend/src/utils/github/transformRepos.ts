// Transform GitHub repositories to Project format

import type { Project, TechStack } from '../../types/portfolio';
import { ProjectCategory, ProjectStatus, SkillLevel } from '../../types/portfolio';
import type { GitHubRepo } from '../../services/github';

/**
 * Infer project category from repository topics, language, and name
 */
function inferCategory(repo: GitHubRepo): ProjectCategory {
  const topics = repo.topics.map(t => t.toLowerCase());
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();

  // Check topics first
  if (topics.includes('web') || topics.includes('frontend') || topics.includes('react') || topics.includes('vue')) {
    return ProjectCategory.WEB;
  }
  if (topics.includes('mobile') || topics.includes('ios') || topics.includes('android') || topics.includes('react-native')) {
    return ProjectCategory.MOBILE;
  }
  if (topics.includes('api') || topics.includes('backend') || topics.includes('server')) {
    return ProjectCategory.API;
  }
  if (topics.includes('library') || topics.includes('package') || topics.includes('npm')) {
    return ProjectCategory.LIBRARY;
  }
  if (topics.includes('tool') || topics.includes('cli') || topics.includes('utility')) {
    return ProjectCategory.TOOL;
  }
  if (topics.includes('game')) {
    return ProjectCategory.GAME;
  }

  // Check name and description
  if (name.includes('web') || name.includes('frontend') || description.includes('web') || description.includes('frontend')) {
    return ProjectCategory.WEB;
  }
  if (name.includes('api') || name.includes('backend') || description.includes('api') || description.includes('backend')) {
    return ProjectCategory.API;
  }
  if (name.includes('mobile') || name.includes('app') || description.includes('mobile')) {
    return ProjectCategory.MOBILE;
  }
  if (name.includes('lib') || name.includes('package') || description.includes('library')) {
    return ProjectCategory.LIBRARY;
  }
  if (name.includes('tool') || name.includes('cli') || description.includes('tool')) {
    return ProjectCategory.TOOL;
  }

  // Default based on language
  if (repo.language) {
    const lang = repo.language.toLowerCase();
    if (['javascript', 'typescript', 'html', 'css'].includes(lang)) {
      return ProjectCategory.WEB;
    }
    if (['python', 'java', 'go', 'rust', 'c++', 'c'].includes(lang)) {
      return ProjectCategory.API;
    }
  }

  return ProjectCategory.OTHER;
}

/**
 * Infer tech stack from repository language and topics
 */
function inferTechStack(repo: GitHubRepo): TechStack[] {
  const techStack: TechStack[] = [];

  // Add primary language
  if (repo.language) {
    let category: 'frontend' | 'backend' | 'database' | 'tool' | 'language' | 'framework' | 'library' | 'other' = 'language';
    if (['React', 'Vue', 'Angular', 'Svelte'].includes(repo.language)) {
      category = 'framework';
    } else if (['Node.js', 'Express', 'FastAPI', 'Django'].includes(repo.language)) {
      category = 'framework';
    }

    techStack.push({
      name: repo.language,
      category,
      level: SkillLevel.ADVANCED,
    });
  }

  // Add technologies from topics (limit to 5)
  const frameworkTopics = ['react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt', 'express', 'fastapi', 'django', 'flask'];
  const toolTopics = ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'terraform', 'github-actions', 'ci-cd'];

  repo.topics.slice(0, 5).forEach(topic => {
    const topicLower = topic.toLowerCase();
    if (frameworkTopics.includes(topicLower)) {
      techStack.push({
        name: topic.charAt(0).toUpperCase() + topic.slice(1),
        category: 'framework',
        level: SkillLevel.ADVANCED,
      });
    } else if (toolTopics.includes(topicLower)) {
      techStack.push({
        name: topic.charAt(0).toUpperCase() + topic.slice(1),
        category: 'tool',
        level: SkillLevel.ADVANCED,
      });
    } else if (!techStack.some(t => t.name.toLowerCase() === topicLower)) {
      techStack.push({
        name: topic.charAt(0).toUpperCase() + topic.slice(1),
        category: 'other',
        level: SkillLevel.INTERMEDIATE,
      });
    }
  });

  return techStack.slice(0, 6); // Limit to 6 items
}

/**
 * Transform GitHub repository to Project format
 */
export function transformGitHubRepoToProject(repo: GitHubRepo, index: number = 0): Project {
  const category = inferCategory(repo);
  const techStack = inferTechStack(repo);

  // Create short description (first 100 chars of description or default)
  const shortDescription = repo.description
    ? repo.description.length > 100
      ? repo.description.substring(0, 100) + '...'
      : repo.description
    : `A ${category} project by ${repo.full_name.split('/')[0]}`;

  // Determine if featured (top 3 repos by stars or recent updates)
  const featured = index < 3 && repo.stargazers_count > 0;

  // Build links
  const links: { type: 'github' | 'demo'; url: string; label: string }[] = [
    {
      type: 'github',
      url: repo.html_url,
      label: 'View Code',
    },
  ];

  if (repo.homepage) {
    links.push({
      type: 'demo',
      url: repo.homepage,
      label: 'Live Demo',
    });
  }

  return {
    id: `github-${repo.id}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    shortDescription,
    description: repo.description || shortDescription,
    category,
    status: ProjectStatus.COMPLETED, // GitHub repos are typically completed
    featured,
    date: repo.created_at,
    endDate: repo.pushed_at,
    images: [
      {
        url: `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`,
        alt: repo.name,
        isPrimary: true,
      },
    ],
    techStack,
    links,
    tags: repo.topics.slice(0, 5),
    animationConfig: {
      delay: index * 0.05,
      duration: 0.6,
      easing: 'power2.out',
      trigger: 'scroll',
    },
  };
}

/**
 * Transform multiple GitHub repositories to Projects
 */
export function transformGitHubReposToProjects(repos: GitHubRepo[]): Project[] {
  // Get the count of repos returned from GitHub (after filtering)
  const repoCount = repos.length;

  // Sort by stars and update date, then take all repos (use the count from GitHub)
  const sortedRepos = [...repos]
    .sort((a, b) => {
      // Prioritize repos with stars, then by update date
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, repoCount); // Use the actual count of repos returned from GitHub

  return sortedRepos.map((repo, index) => transformGitHubRepoToProject(repo, index));
}

