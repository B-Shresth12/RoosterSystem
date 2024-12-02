import { Link } from '@inertiajs/react';

const DangerLinkButton = ({ href, className, children, ...prop }) => {
    return (
        <Link
            href={href}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-red-600 p-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800` +
                className
            }
            {...prop}
        >
            {children}
        </Link>
    );
};

export default DangerLinkButton;
