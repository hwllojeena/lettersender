"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Write() {
    const [recipientEmail, setRecipientEmail] = useState("");
    const [message, setMessage] = useState("");
    const [senderInitial, setSenderInitial] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const handleSend = () => {
        if (!recipientEmail || !message || !senderInitial) {
            alert("Please fill in all fields!");
            return;
        }
        setShowNotification(true);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between', // Spacing out top, center, bottom
            minHeight: '100vh',
            padding: '2rem 1rem',
            position: 'relative'
        }}>

            {/* Top Section: Title */}
            <header style={{ marginTop: '2rem', textAlign: 'center' }}>
                <h1 className="home-title" style={{
                    fontSize: '2.5rem',
                    fontWeight: '500',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--foreground)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    Send your letter anonymously!
                </h1>
            </header>

            {/* Center Section: Image & Form */}
            <main className="home-image-container paper-image-container no-animation" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '400px', // Slightly wider to accommodate fields comfortably
                transition: 'max-width 0.3s ease',
                position: 'relative'
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3/4', // Vertical paper aspect ratio
                }}>
                    <Image
                        src="/paper.png"
                        alt="Paper"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />

                    {/* Letter Overlay Fields */}
                    <div style={{
                        position: 'absolute',
                        top: '12%',
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        transform: 'rotate(1.5deg)', // The requested rotation
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.2rem',
                        color: 'rgba(84, 110, 122, 0.8)', // Matches "handwritten" ink feel
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ fontWeight: '600', color: '#134857' }}>To:</span>
                            <input
                                type="email"
                                placeholder="Recipient's Email"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                className="letter-input"
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: '1.3rem',
                                    color: 'inherit'
                                }}
                            />
                        </div>

                        <textarea
                            placeholder="Write a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="letter-textarea"
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                fontFamily: 'inherit',
                                fontSize: '1.3rem',
                                lineHeight: '1.4',
                                color: 'inherit',
                                marginTop: '1rem'
                            }}
                        />

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginTop: 'auto', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: '600', color: '#134857' }}>From:</span>
                            <input
                                type="text"
                                placeholder="Your Initial"
                                value={senderInitial}
                                onChange={(e) => setSenderInitial(e.target.value)}
                                className="letter-input"
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: '1.3rem',
                                    color: 'inherit'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Section: Button */}
            <footer style={{ marginBottom: '3rem', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                <Link href="/" className="btn-primary home-button" style={{ opacity: 0.5 }}>
                    Back
                </Link>
                <button
                    onClick={handleSend}
                    className="btn-primary home-button"
                >
                    Send
                </button>
            </footer>

            {/* Notification Modal */}
            {showNotification && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '400px',
                        aspectRatio: '3/2',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        animation: 'fadeInScale 0.3s ease-out'
                    }}>
                        <Image
                            src="/popup_bg.png"
                            alt="Notification Background"
                            fill
                            style={{ objectFit: 'contain', zIndex: -1 }}
                        />
                        <div style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '0 10%', // Giving some space from the hand-drawn border
                            transform: 'rotate(-0.5deg)' // Slight tilt to match the hand-drawn feel
                        }}>
                            <h2 className="home-title" style={{ fontSize: '2.5rem', color: '#134857', fontWeight: '500' }}>Message Sent!</h2>
                            <p style={{ fontSize: '1.3rem', lineHeight: '1.4', color: '#546e7a' }}>
                                Your letter is being sent through email.
                            </p>
                            <Link href="/" className="btn-primary home-button" style={{ alignSelf: 'center', marginTop: '0.5rem' }}>
                                Close
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
