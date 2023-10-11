import { default as local_adapter } from '@sveltejs/adapter-auto';
import { default as prod_adapter } from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: import.meta.env.DEV ? local_adapter() : prod_adapter()
  }
};

export default config;
