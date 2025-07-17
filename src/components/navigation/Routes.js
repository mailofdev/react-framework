const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'bi-house-door-fill', // Represents home/overview
    active: true,
    showIn: ['sidebar', 'topbar'],
  },
  {
    label: 'Skills',
    href: '/skills',
    icon: 'bi-lightning-charge-fill', // Suggests powerful skills or energy
    showIn: ['sidebar', 'topbar'],
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: 'bi-folder2-open', // Represents a folder of work/projects
    showIn: ['sidebar', 'topbar'],
  },
  {
    label: 'Contact me',
    href: '/contactme',
    icon: 'bi-chat-dots-fill', // Chat bubble for communication/contact
    showIn: ['sidebar', 'topbar'],
  },
];

export default routes;
