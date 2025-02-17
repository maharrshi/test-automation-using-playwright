module.exports = async (page) => {
    console.log("Logging into OrangeHRM");
  
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  
    // Enter username
    await page.fill('//input[@placeholder="Username"]', 'Admin');
   
    // Enter password
    await page.fill('//input[@placeholder="Password"]', 'admin123');
  
    // Click Login button
    await page.click('//button[@type="submit"]');
  
    // Wait for the dashboard to load
    await page.waitForSelector('//span[text()="Dashboard"]');
  
    console.log("Login successful! Navigating to dashboard...");
  };
  