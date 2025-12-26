import { Container } from '../../layout';
import { portfolioConfig } from '../../../config/portfolio.config';
import { FeaturedProject } from './FeaturedProject';
import { ProjectShowcase } from './ProjectShowcase';
import { useState, useMemo, useEffect } from 'react';
import { useScrollRevealObserver } from '../../../hooks/useScrollRevealObserver';
import { fetchGitHubRepos, extractGitHubUsername } from '../../../services/github';
import { transformGitHubReposToProjects } from '../../../utils/github/transformRepos';
import type { Project } from '../../../types/portfolio';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filter state - can be enabled later for filtering functionality
  // const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  // const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

  // Set up scroll reveal observer for animations
  useScrollRevealObserver();

  // Fetch GitHub repos on mount
  useEffect(() => {
    async function loadGitHubProjects() {
      try {
        setLoading(true);
        setError(null);

        // Get GitHub username from social links
        const githubLink = portfolioConfig.social.find(
          link => link.platform === 'github'
        );

        if (!githubLink) {
          throw new Error('GitHub link not found in portfolio config');
        }

        const username = extractGitHubUsername(githubLink.url);
        if (!username) {
          throw new Error('Could not extract GitHub username from URL');
        }

        // Fetch repos from GitHub
        const repos = await fetchGitHubRepos(username);

        // Transform to projects
        const transformedProjects = transformGitHubReposToProjects(repos);
        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error loading GitHub projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        // Fallback to empty array or config projects
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadGitHubProjects();
  }, []);

  // Separate featured and non-featured projects
  const featuredProject = useMemo(() => {
    return projects.find(p => p.featured) || projects[0];
  }, [projects]);

  const nonFeaturedProjects = useMemo(() => {
    if (!featuredProject) return projects;
    return projects.filter(p => p.id !== featuredProject.id);
  }, [projects, featuredProject]);

  // Filter projects - currently showing all non-featured projects
  // Can be enabled later for filtering functionality
  const filteredProjects = useMemo(() => {
    return nonFeaturedProjects;
    // Future filtering:
    // return nonFeaturedProjects.filter(project => {
    //   const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    //   const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    //   return categoryMatch && statusMatch;
    // });
  }, [nonFeaturedProjects]);

  if (loading) {
    return (
      <Container variant="standard" className={styles.projectsSection}>
        <div className={styles.loadingState}>
          <p>Loading projects from GitHub...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container variant="standard" className={styles.projectsSection}>
        <div className={styles.errorState}>
          <p>Error loading projects: {error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container variant="standard" className={styles.projectsSection}>
      <div className={styles.projectsContent}>
        <header className={styles.projectsHeader} data-animate-direction="up" data-animate-delay="0" data-depth="foreground" data-parallax="low">
          <h2 className={styles.projectsTitle}>Selected Work</h2>
          <p className={styles.projectsSubtitle}>
            A curated collection of projects from GitHub
          </p>
        </header>

        {featuredProject && (
          <FeaturedProject project={featuredProject} />
        )}

        {nonFeaturedProjects.length > 0 && (
          <ProjectShowcase projects={filteredProjects} />
        )}

        {projects.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

