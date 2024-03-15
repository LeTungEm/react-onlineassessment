const Heading  = ({text}) => {
    return (
        <div className="relative my-5 z-10 overflow-hidden font-medium after:ml-5 after:content-[''] after:absolute after:border-b-2 after:w-full after:top-1/2 after:border-gray-100">{text}</div>
    );
}

export default Heading