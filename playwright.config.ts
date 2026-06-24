import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	retries: 0,
	timeout: 30000,
	expect: { timeout: 5000 },
	//globalSetup: './global-setup.ts',
	use: {
		//baseURL: 'https://www.airalo.com/',
		//storageState: './utils/auth-state.json',
		headless: true,
		viewport: { width: 1280, height: 720 },
		actionTimeout: 10000,
		ignoreHTTPSErrors: true,
	},
	projects: [
		// ----------------------
		// UI PROJECT (Chromium)
		// ----------------------
		{
			name: 'ui-chromium',
			testDir: './tests/ui',
			use: {
				baseURL: 'https://www.airalo.com/',
				...devices['Desktop Chrome']
			}
		},

		// {
		//   name: 'ui-firefox',
		//   testDir: './tests/ui',
		//   use: {
		//     baseURL: 'https://www.airalo.com/',
		//     ...devices['Desktop Firefox']
		//   }
		// },

		// ----------------------
		// API PROJECT
		// ----------------------
		{
			name: 'api',
			testDir: './tests/api',
			use: {
				baseURL: 'https://partners-api.airalo.com'
			}
		}
	],
	reporter: [['list'], ['html']],
});
