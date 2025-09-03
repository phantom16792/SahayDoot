import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ isOpen, setIsOpen }) {
  const links = [
    { name: 'Dashboard', path: '/', icon: 'fas fa-tachometer-alt' },
    { name: 'Usermanagement', path: '/UserManagement', icon: 'fas fa-users' },
    { name: 'EmergencyAlerts', path: '/alert', icon: 'fas fa-exclamation-triangle' },
    { name: 'ResponderManagement', path: '/responder', icon: 'fas fa-user-tie' },
    { name: 'Notifications', path: '/Notification', icon: 'fas fa-bell' },
    { name: 'Reports', path: '/reports', icon: 'fas fa-chart-bar' },
    { name: 'Settings', path: '/settings', icon: 'fas fa-cog' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && (
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt sidebar-logo-icon"></i>
            <div className="sidebar-title">Control Center</div>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="sidebar-toggle">
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} sidebar-icon`}></i>
        </button>
      </div>
      <ul className="sidebar-menu">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              aria-label={link.name}
              title={isOpen ? '' : link.name}
            >
              <i className={`fas ${link.icon} ${isOpen ? 'sidebar-icon' : 'sidebar-icon-collapsed'}`}></i>
              {isOpen && link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="sidebar-logout" title={isOpen ? '' : 'Logout'}>
          <i className={`fas fa-sign-out-alt ${isOpen ? 'sidebar-icon' : 'sidebar-icon-collapsed'}`}></i>
          {isOpen && 'Logout'}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;