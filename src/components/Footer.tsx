import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
    <footer className="bg-white text-black p-4 md:p-6 mt-0 border-t border-gray-200 bottom-0 left-0 right-0 z-40" ref={ref} role="contentinfo">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            <section aria-labelledby="footer-legal">
                <div className="text-center mt-4 md:mt-6">
                    <p id="footer-legal" className="text-xs md:text-sm">&copy; 2024 RadioRogue. All rights reserved.</p>
                </div>
            </section>
        </div>
    </footer>
));

export default Footer;
