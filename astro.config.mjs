// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://dwain.maralack.com',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Health Plan',
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '← Back to Blog',
          link: '/',
        },
        {
          label: 'Overview',
          link: '/health/',
        },
        {
          label: 'Breakfasts',
          autogenerate: { directory: 'health/breakfasts' },
        },
        {
          label: 'Meals',
          items: [
            {
              label: 'Lunches',
              autogenerate: { directory: 'health/lunches' },
            },
            {
              label: 'Dinners',
              autogenerate: { directory: 'health/dinners' },
            },
          ],
        },
        {
          label: 'Soups',
          autogenerate: { directory: 'health/soups' },
        },
        {
          label: 'Sides',
          autogenerate: { directory: 'health/sides' },
        },
        {
          label: 'Sauces',
          autogenerate: { directory: 'health/sauces' },
        },
        {
          label: 'Treats',
          autogenerate: { directory: 'health/treats' },
        },
        {
          label: 'Shopping Lists',
          autogenerate: { directory: 'health/shopping' },
        },
        {
          label: 'Special Meals',
          autogenerate: { directory: 'health/specialmeals' },
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/dwainm' },
      ],
      components: {
        SiteTitle: './src/components/HealthSiteTitle.astro',
      },
      disable404Route: true,
    }),
  ],
});
