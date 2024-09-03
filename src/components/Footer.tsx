import React, { useRef } from 'react';

const Footer = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
    <footer className="bg-white text-black p-8 mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    <p className="mt-2">Email: <a href="mailto:contact@radiorogue.com" className="text-red-600 hover:underline">contact@radiorogue.com</a></p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Radio Lane, Music City, USA</p>
                </div>
                <div className="mt-8 md:mt-0">
                    <h2 className="text-xl font-semibold text-center">Newsletter Signup</h2>
                    <form className="flex mt-4">
                        <input
                            type="email"
                            className="p-2 border border-gray-300 rounded-l w-full md:w-64"
                            placeholder="Enter your email"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6">
                <div className="mt-4 md:mt-0 text-center md:text-right">
                    <p>&copy; 2024 RadioRogue. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
));

export default Footer;
