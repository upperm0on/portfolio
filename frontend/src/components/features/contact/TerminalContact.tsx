import { useState } from 'react';
import styles from './TerminalContact.module.css';

export function TerminalContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { key: 'name', prompt: 'Enter your name:', placeholder: 'e.g. John Doe' },
        { key: 'email', prompt: 'Enter your email:', placeholder: 'e.g. john@example.com' },
        { key: 'message', prompt: 'Your message:', placeholder: 'How can I help you?' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [steps[currentStep].key]: e.target.value }));
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            console.log('Form submitted:', formData);
            // Handle submission logic here
            alert('Message sent! (Simulation)');
            setFormData({ name: '', email: '', message: '' });
            setCurrentStep(0);
        }
    };

    return (
        <div className={styles.terminal}>
            <div className={styles.topBar}>
                <div className={styles.dots}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                </div>
                <div className={styles.title}>bash — contact</div>
            </div>
            <div className={styles.content}>
                <div className={styles.welcome}>Last login: {new Date().toLocaleDateString()} on ttys001</div>

                {steps.slice(0, currentStep + 1).map((step, index) => (
                    <div key={step.key} className={styles.line}>
                        <span className={styles.prompt}>user@yaw:~$</span>
                        <span className={styles.text}>{step.prompt}</span>
                        {index < currentStep ? (
                            <span className={styles.enteredValue}>{formData[step.key as keyof typeof formData]}</span>
                        ) : (
                            <form onSubmit={handleNext} className={styles.inputForm}>
                                {step.key === 'message' ? (
                                    <textarea
                                        autoFocus
                                        value={formData[step.key as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        placeholder={step.placeholder}
                                        className={styles.input}
                                        rows={1}
                                    />
                                ) : (
                                    <input
                                        type={step.key === 'email' ? 'email' : 'text'}
                                        autoFocus
                                        value={formData[step.key as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        placeholder={step.placeholder}
                                        className={styles.input}
                                    />
                                )}
                                <button type="submit" className={styles.hiddenButton} />
                            </form>
                        )}
                    </div>
                ))}
                {currentStep === steps.length - 1 && formData.message && (
                    <div className={styles.help}>Press Enter to transmit...</div>
                )}
            </div>
        </div>
    );
}
