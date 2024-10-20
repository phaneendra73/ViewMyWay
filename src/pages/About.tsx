import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../index.css";

const About: React.FC = () => {
    return (
        <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden m-12">
            {/* Content Section */}
            <div className="flex-grow flex items-center justify-center p-8 relative z-10">
                <div className={`bg-slate-200 text-black rounded-3xl shadow-lg p-6 transition-all duration-[5000ms] ease-in-out opacity-85 flex flex-col items-center`}>
                    <h1 className="text-xl font-bold mb-4">About</h1>
                    <p className="mb-4 w-[90%] mx-auto">
                        "View My Way" is a vision brought to life through a dedicated journey of learning and development. After mastering React and backend technologies, I am excited to build an application that leverages Cloudflare Workers and Prisma for a seamless experience.
                    </p>
                    <p className="mb-4 w-[90%] mx-auto">
                        This project embodies my commitment to exploring innovative solutions and pushing the boundaries of creativity. With the skills I’ve acquired this year, I aim to create a platform that not only showcases insightful articles but also inspires collaboration and community engagement.
                    </p>
                    <p className="mb-4 w-[90%] mx-auto">
                        By integrating advanced technologies like Hono for routing, I strive to ensure that every user has a smooth and efficient experience. My goal is to foster a space where diverse perspectives can flourish and every voice can be heard.
                    </p>
                    <p className="mb-4 w-[90%] mx-auto">
                        Join me on this journey as we explore creativity, connection, and the power of community. Together, we can celebrate unique stories and inspire one another through shared experiences.
                    </p>


                    {/* Book Shelf SVG Animation below the About Us text */}
                    <div >
                        <svg className="book-shelf" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 84 94" height="150" width="150">
                            <path fill="none" d="M37.612 92.805L4.487 73.71c-2.75-1.587-4.45-4.52-4.45-7.687L.008 27.877c-.003-3.154 1.676-6.063 4.405-7.634L37.558 1.167c2.73-1.57 6.096-1.566 8.835.013l33.124 19.096c2.75 1.586 4.45 4.518 4.45 7.686l.028 38.146c.002 3.154-1.677 6.063-4.406 7.634L46.445 92.818c-2.73 1.57-6.096 1.566-8.834-.013z" />
                            <g className="book-shelf__book book-shelf__book--one" fillRule="evenodd">
                                <path fill="#00000" d="M31 29h4c1.105 0 2 .895 2 2v29c0 1.105-.895 2-2 2h-4c-1.105 0-2-.895-2-2V31c0-1.105.895-2 2-2z" />
                                <path fill="#ffffff" d="M34 36h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1s-.448 1-1 1zm-2 1h2c.552 0 1 .448 1 1s-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1z" />
                            </g>
                            <g className="book-shelf__book book-shelf__book--two" fillRule="evenodd">
                                <path fill="#00000" d="M39 34h6c1.105 0 2 .895 2 2v24c0 1.105-.895 2-2 2h-6c-1.105 0-2-.895-2-2V36c0-1.105.895-2 2-2z" />
                                <path fill="#ffffff" d="M42 38c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z" />
                            </g>
                            <g className="book-shelf__book book-shelf__book--three" fillRule="evenodd">
                                <path fill="#00000" d="M49 32h2c1.105 0 2 .86 2 1.92v25.906c0 1.06-.895 1.92-2 1.92h-2c-1.105 0-2-.86-2-1.92V33.92c0-1.06.895-1.92 2-1.92z" />
                                <path fill="#ffffff" d="M50 35c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1z" />
                            </g>
                            <g fillRule="evenodd">
                                <path className="book-shelf__shelf" fill="#00000" d="M21 60h40c1.105 0 2 .895 2 2s-.895 2-2 2H21c-1.105 0-2-.895-2-2s.895-2 2-2z" />
                                <path fill="#00000" d="M51.5 67c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5zm-21 0c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5z" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <Nav />
            <Footer />
        </div>
    );
};

export default About;
