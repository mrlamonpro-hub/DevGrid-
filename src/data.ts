import { ServiceCategory, DiscordWidgetData } from './types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'minecraft',
    name: 'Minecraft Server Setup',
    emoji: '🎮',
    iconName: 'Gamepad2',
    description: 'Expert configuration for Minecraft servers. From clean custom plugin folders to advanced game modes.',
    items: [
      {
        id: 'mc-basic',
        name: 'Basic Setup',
        price: 39,
        description: 'Perfect for starting with friends. Vanilla configuration, standard optimization, and basic server properties.',
        features: ['Vanilla / Paper core optimization', 'Essential server configurations', 'Basic network connectivity', '1 game mode start guide']
      },
      {
        id: 'mc-plugin',
        name: 'Plugin Setup',
        price: 49,
        description: 'Enhance your server. Installing, testing, and optimizing up to 15 custom plugins of your choice.',
        features: ['Up to 15 custom plugins', 'Crash/Lag-free configuration', 'CoreProtect or equivalent backups', 'Database integration if required']
      },
      {
        id: 'mc-permissions',
        name: 'Permissions Setup',
        price: 59,
        description: 'Secure your server roles. Full setup of LuckPerms, custom chat prefixes, and rank ladders.',
        features: ['LuckPerms role configuration', 'Custom prefixes & tab lists', 'Up to 5 different staff/player ranks', 'Command blocks prevention']
      },
      {
        id: 'mc-full',
        name: 'Full Server Setup',
        price: 149,
        description: 'Complete premium server setup with custom game modes (Skyblock, Survival, Bedwars, or Lifesteal) and fine-tuned economy.',
        features: ['Any custom gamemode', 'LuckPerms + custom ranks', 'Premium shop & balanced economy', 'Anti-cheat & security suite', 'Pre-configured spawn & warp areas']
      }
    ]
  },
  {
    id: 'hosting',
    name: 'Hosting Services',
    emoji: '☁️',
    iconName: 'Cloud',
    description: 'Reliable, affordable, and high-performance hosting deployment with top-tier security standards.',
    items: [
      {
        id: 'host-lowcost',
        name: 'Minecraft Server Hosting Low Cost',
        price: 79,
        description: 'Highly optimized, continuous uptime budget hosting config setup for high player counts without lag.',
        features: ['High clock speed processors', 'DDoS protection included', 'SFTP & Database access', 'Instant node status panel']
      },
      {
        id: 'host-vps',
        name: 'VPS Configuration & Setup',
        price: 99,
        description: 'Complete Virtual Private Server initialization, updating, hardening, and optimization.',
        features: ['Ubuntu/Debian clean installation', 'Firewall (UFW/fail2ban) protection', 'SSH key authentication setup', 'Docker & Node.js environment setup']
      },
      {
        id: 'host-pterodactyl',
        name: 'Pterodactyl Panel Installation',
        price: 159,
        description: 'Installation of the modern web game panel (Pterodactyl) on your VPS node, setup with wings.',
        features: ['Panel web dashboard installation', 'SSL security certificates', 'Daemon (Wings) node configuration', 'Custom theme support']
      },
      {
        id: 'host-security',
        name: 'Custom Domain & Cloudflare Security Setup',
        price: 159,
        description: 'Connect your custom domain name with enterprise Cloudflare security to proxy traffic and mask raw IPs.',
        features: ['Cloudflare DNS proxying', 'Anti-DDoS and Bot Fight Mode', 'Custom subdomains (e.g. play.server.com)', 'Automatic SSL certificates']
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative Design Works',
    emoji: '🎨',
    iconName: 'Palette',
    description: 'Stunning eye-catching visuals to establish your server branding and stand out in the community.',
    items: [
      {
        id: 'design-logo',
        name: 'Logo Design',
        price: 39,
        description: 'Premium vector logo design representing your server identity. Clear branding for icons and web profiles.',
        features: ['High-resolution output', 'Transparent background (.PNG)', 'Tailored color palette', '2 revisions included']
      },
      {
        id: 'design-banner',
        name: 'Server Banner',
        price: 39,
        description: 'A striking promotional banner for server lists and Discord server cover invites.',
        features: ['Standard server list sizes', 'Visually matched with your logo', 'Fully custom background artwork', 'High fidelity delivery']
      },
      {
        id: 'design-advert',
        name: 'Discord Advertisement Banner',
        price: 99,
        description: 'Animated or rich static promotional banner optimized to attract new members via ads.',
        features: ['Eye-catching animations', 'Compelling text call-to-actions', 'Optimized for mobile & desktop layouts', 'Editable source files (.PSD/.Figma)']
      },
      {
        id: 'design-branding',
        name: 'Full Branding Pack',
        price: 149,
        description: 'Complete branding overhaul including a matching Logo, Banner, Advertisement materials, and Profile assets.',
        features: ['Vector Logo + Source Files', 'Animated & Static Server Banners', '5 Discord Channel Headers', 'Custom Brand guidelines']
      }
    ]
  },
  {
    id: 'discord',
    name: 'Discord Community Services',
    emoji: '🤖',
    iconName: 'Users',
    description: 'Structure, automate, and protect your Discord community with custom security systems and interactive integrations.',
    items: [
      {
        id: 'disc-bot',
        name: 'Bot Setup',
        price: 39,
        description: 'Setup and custom configuration of core utility bots (Mee6, Dyno, Carl-bot) with welcome templates.',
        features: ['Standard moderation commands', 'Custom reaction roles', 'Welcome message layout', 'Auto-publishing channels']
      },
      {
        id: 'disc-automod',
        name: 'AutoMod Setup',
        price: 49,
        description: 'Establish a powerful anti-spam, anti-link, and bad-word filter system to auto-protect channels 24/7.',
        features: ['Anti-raid protection limits', 'Word blacklist regex rules', 'Spam detection & mute triggers', 'Alt-account gatekeeper filters']
      },
      {
        id: 'disc-ticket',
        name: 'Ticket System',
        price: 39,
        description: 'Enable an structured customer support system within your Discord server with panels and private logs.',
        features: ['Interactive ticket panels (Buttons/Dropdowns)', 'Private staff view channels', 'Automated ticket transcript logs', 'Custom support roles permissions']
      },
      {
        id: 'disc-full',
        name: 'Full Discord Setup',
        price: 149,
        description: 'A highly professional community server overhaul. Elegant channels, ranks, fully setup security, bots, and ticketing.',
        features: ['Aesthetic text formatting & emojis', 'Permissions hierarchy audit', 'Advanced AutoMod + Anti-raid', 'Ticket and verification panels', 'Staff guides & standard templates']
      }
    ]
  },
  {
    id: 'website',
    name: 'Website Development Services',
    emoji: '🌐',
    iconName: 'Globe',
    description: 'High-speed, modern, responsive custom websites styled specifically to showcase your community or business.',
    items: [
      {
        id: 'web-standard',
        name: 'Standard Web Design',
        price: 59,
        description: 'A beautiful single-page informational landing page styled with clean typography and graphics.',
        features: ['Fully responsive layout', 'Custom theme pairing', 'About Us & Features sections', 'High-performance loading']
      },
      {
        id: 'web-animated',
        name: 'Animated Web Design',
        price: 99,
        description: 'Stunning premium landing page complete with interactive animations, hover effects, and slide-ins.',
        features: ['Custom scroll transitions', 'Smooth page-entry effects', 'Interactive service panels', 'Configured server list counters']
      },
      {
        id: 'web-premium',
        name: 'Premium Animated & Professional Web Design',
        price: 199,
        description: 'The absolute best. Fully immersive multi-section website with advanced micro-animations, real-time widgets, and custom modules.',
        features: ['Complete bespoke design layout', 'Real-time Discord status widget', 'Advanced scroll/hover interactions', 'Interactive Contact system', 'SEO optimized meta-tags']
      },
      {
        id: 'web-contact',
        name: 'Contact Us Page & Form Setup',
        price: 59,
        description: 'A dedicated contact page with advanced form verification, error catching, and custom Discord Webhook alert setups.',
        features: ['Custom fields configuration', 'Form client-side validations', 'Discord Webhook alert triggers', 'Spam prevention (reCaptcha info)']
      }
    ]
  }
];

export const MOCK_DISCORD_WIDGET: DiscordWidgetData = {
  id: '124567890123456789',
  name: 'DevGrid Services',
  instant_invite: 'https://discord.gg/devgrid',
  channels: [
    { id: '1', name: '📢-announcements', position: 1 },
    { id: '2', name: '💼-order-services', position: 2 },
    { id: '3', name: '💬-general-chat', position: 3 },
    { id: '4', name: '🔧-support-tickets', position: 4 }
  ],
  presence_count: 48,
  members: [
    { id: '101', username: 'LamonPro', discriminator: '0001', status: 'online', game: { name: 'Coding DevGrid Website' } },
    { id: '102', username: 'PixelArtist', discriminator: '2431', status: 'idle', game: { name: 'Designing Logo Pack' } },
    { id: '103', username: 'SteveCraft', discriminator: '8843', status: 'dnd', game: { name: 'Setting LuckPerms Ranks' } },
    { id: '104', username: 'HostingGuru', discriminator: '1102', status: 'online', game: { name: 'Optimizing VPS Security' } },
    { id: '105', username: 'AlexGrid', discriminator: '5940', status: 'online', game: { name: 'Managing Discord Bots' } },
    { id: '106', username: 'ShadowWalker', discriminator: '6748', status: 'offline', game: undefined },
    { id: '107', username: 'Aurelia', discriminator: '9920', status: 'online', game: { name: 'Pterodactyl Installation' } },
    { id: '108', username: 'NeoMatrix', discriminator: '0482', status: 'idle', game: { name: 'Vibe Check' } }
  ]
};
