import NavLink from "../NavLink";
const Navigation = () => {
    return (
        <>
            <NavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
            >
                Dashboard
            </NavLink>
            <NavLink
                href={route('admin.surveys.index')}
                active={route().current('survey.*')}
            >
                Survey
            </NavLink>
        </>
    );
};

export default Navigation;