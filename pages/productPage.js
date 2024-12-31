import { expect } from '@playwright/test';
require('dotenv').config();
export class ProductPage {
	constructor(page) {
		this.page = page;
	}

	// This function is used create a Product
	async createProduct(product) {
		const WP_BASE_URL = process.env.WP_BASE_URL ?? '';

		//Product Title:
		await this.page.getByLabel('Product name').click();
		await this.page.getByLabel('Product name').fill(product.title);

		// Add categories
		await this.page
			.getByRole('link', { name: '+ Add new category' })
			.click();
		await this.page.getByLabel('Add new category').fill(product.category);
		await this.page
			.getByRole('button', { name: 'Add new category' })
			.click();

		// Upload product image
		if (product.imageId) {
			await this.page
				.getByRole('link', { name: 'Set product image' })
				.click();
			await this.page
				.locator(`//li[@data-id="${product.imageId}"]`)
				.click();
			await this.page
				.getByRole('button', { name: 'Set product image' })
				.click();
		}

		// Set pricing
		await this.page.getByLabel('Regular price (₹)').click();
		await this.page
			.getByLabel('Regular price (₹)')
			.fill(product.regularPrice.toString());
		await this.page.getByLabel('Sale price (₹)').click();
		await this.page
			.getByLabel('Sale price (₹)')
			.fill(product.salePrice.toString());
		//Publish the product:
		await this.page
			.getByRole('button', { name: 'Publish', exact: true })
			.click();
		await this.page.getByRole('link', { name: WP_BASE_URL }).click();
		//Verify product title to be visible:
		await expect(
			this.page.getByRole('heading', { name: product.title })
		).toBeVisible();
	}
	async gotoAdminPage() {
		await this.page.goto(`/wp-admin`);
	  }
	
	  async loginAdmin(username) {
		await this.page.getByLabel("Username or Email Address").click();
		await this.page.getByLabel("Username or Email Address").fill(username);
		await this.page.getByLabel("Password", { exact: true }).fill(username);
		await this.page.getByRole("button", { name: "Log In" }).click();
	  }

}
