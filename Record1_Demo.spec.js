import { test, expect, chromium } from '@playwright/test';

// Function to generate a random email address
function generateRandomEmail() {
  const domains = ['example.com', 'test.com', 'demo.com', 'mail.com', 'domain.com'];
  const randomName = Math.random().toString(36).substring(2, 10); // Random string for email prefix
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomName}@${randomDomain}`;
}

// Function to generate random names
function generateRandomName() {
  const firstNames = [
    'John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'Daniel', 'Laura',
    'William', 'Olivia', 'James', 'Sophia', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia', 'Henry', 'Ava',
    'Ethan', 'Mia', 'Alexander', 'Isabella', 'Matthew', 'Chloe', 'Samuel', 'Grace', 'Jack', 'Zoe'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Roberts',
    'Clark', 'Lewis', 'Walker', 'Young', 'Allen', 'King', 'Scott', 'Green', 'Adams', 'Baker'
  ];
  
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return { firstName: randomFirstName, lastName: randomLastName };
}

// Function to generate random group name
function generateRandomGroupName() {
  const adjectives = [
    'Awesome', 'Brave', 'Cool', 'Unique', 'Creative', 'Funky', 'Smart', 'Epic',
    'Majestic', 'Mighty', 'Bold', 'Fearless', 'Invincible', 'Clever', 'Adventurous',
    'Vibrant', 'Dynamic', 'Radiant', 'Powerful', 'Daring', 'Fierce', 'Heroic',
    'Inspirational', 'Courageous', 'Legendary', 'Dynamic', 'Innovative', 'Luminous',
    'Unstoppable', 'Electric', 'Resilient', 'Ambitious', 'Brilliant', 'Vigorous'
  ];

  const nouns = [
    'Wolves', 'Lions', 'Tigers', 'Heroes', 'Adventurers', 'Explorers', 'Rangers', 'Titans',
    'Knights', 'Dragons', 'Warriors', 'Legends', 'Pioneers', 'Champions', 'Gladiators',
    'Defenders', 'Guardians', 'Mavericks', 'Outlaws', 'Conquerors', 'Rebels', 'Legends',
    'Nomads', 'Pirates', 'Sentinels', 'Sharks', 'Wizards', 'Falcons', 'Eagles',
    'Revolutionaries', 'Mystics', 'Crusaders', 'Guardians', 'Titans', 'Kings', 'Vikings'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective} ${noun}`;
}

// Custom highlight function with XPath support
async function highlightElement(page, xpathSelector) {
  await page.evaluate((xpathSelector) => {
    // Use document.evaluate to handle XPath selectors
    const xpathResult = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = xpathResult.singleNodeValue; // Get the single matching node

    if (element) {
      // Save original styles
      const originalStyles = {
        backgroundColor: element.style.backgroundColor,
        border: element.style.border,
      };

      // Apply highlight styles
      element.style.backgroundColor = 'yellow';
      element.style.border = '3px solid red';

      // Reset styles after 1 second
      setTimeout(() => {
        element.style.backgroundColor = originalStyles.backgroundColor;
        element.style.border = originalStyles.border;
      }, 1000);
    }
  }, xpathSelector); // Passing XPath to the evaluate function
}

test('Wingspans automation test for create, edit, and delete user groups', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Clear cookies and storage
  await context.clearCookies();
  await context.clearPermissions();
  
  // Set default timeout globally for the page
  page.setDefaultTimeout(195000);

  // Number of random entries to generate
  const numOfEntries = 1;
  let randomEmails = [];
  let randomFirstNames = [];
  let randomLastNames = [];
  let randomGroupNames = [];

  // Generate random entries
  for (let i = 0; i < numOfEntries; i++) {
    const randomEmail = generateRandomEmail();
    const randomName = generateRandomName();
    const randomGroupName = generateRandomGroupName();
    
    randomEmails.push(randomEmail);
    randomFirstNames.push(randomName.firstName);
    randomLastNames.push(randomName.lastName);
    randomGroupNames.push(randomGroupName);

    console.log(`Entry ${i + 1}:`);
    console.log('Random Email:', randomEmail);
    console.log('Random Name:', randomName.firstName, randomName.lastName);
    console.log('Random Group Name:', randomGroupName);
  }

    // direct to URL and login with user and redirect to admin dashboard
    {
  await page.goto('https://development.d3tqwuyiftpxq0.amplifyapp.com/');
  await page.waitForTimeout(5100);
  await highlightElement(page, "//button[normalize-space(text())='Sign In']");
  await page.locator("//button[normalize-space(text())='Sign In']").click();
  await page.waitForTimeout(5100);
  await highlightElement(page, "//div[@class='prompt desktop-only']//a[1]");
  await page.locator("//div[@class='prompt desktop-only']//a[1]").click();
  await page.waitForTimeout(5100);
  /*await page.getByRole('button', { name: 'Sign in with email' }).click();*/
  await highlightElement(page,"//button[@class='firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button']");
  await page.locator("//button[@class='firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button']").click();
  await page.waitForTimeout(5100);
  await highlightElement(page, "//input[@id='ui-sign-in-email-input']");
  await page.locator("//input[@id='ui-sign-in-email-input']").fill('varun.maurya@v2solutions.com');
  await page.waitForTimeout(5100);
  await highlightElement(page, "//button[@type='submit']");
  await page.locator("//button[@type='submit']").click();
  await page.waitForTimeout(5100);
  await highlightElement(page, "//input[@type='password']");
  await page.locator("//input[@type='password']").fill('Mail@123');
  await page.waitForTimeout(5100);
  await highlightElement(page, "//button[@type='submit']");
  await page.locator("//button[@type='submit']").click();
  await page.waitForTimeout(5100);
  await page.locator("[class='back-to-admin-text']").click();
  await page.waitForTimeout(5100);
  await page.waitForLoadState('load');
  await highlightElement(page, '//a[@href="/educator/students/"]');
  await page.locator('//a[@href="/educator/students/"]').click();
  await page.waitForTimeout(5100);
  await highlightElement(page, '//a[@href="/educator/faculty/"]');
  await page.locator('//a[@href="/educator/faculty/"]').click();
  await page.waitForTimeout(5100);
}

  // Add user flow 
{
  await highlightElement(page,"//div[@class='rounded-dropdown rounded-dropdown-primary no-dropdown-arrow dropdown']//button[@id='dropdown-basic']");
  await page.locator("//div[@class='rounded-dropdown rounded-dropdown-primary no-dropdown-arrow dropdown']//button[@id='dropdown-basic']").click();
  await page.waitForTimeout(5100);
  await highlightElement(page,'(//a[@href="#" and @class="dropdown-item"])[1]');
  await page.locator('(//a[@href="#" and @class="dropdown-item"])[1]').click({timeout:5100});
  await page.waitForLoadState('load');
  for (let i = 0; i < numOfEntries; i++) {
    await highlightElement(page, "//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[1]/div[1]/input[1]");
    await page.locator("//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[1]/div[1]/input[1]").fill(randomFirstNames[i]);
    await page.waitForTimeout(4500);
    await highlightElement(page,"//div[contains(@class,'modal-body')]//div[2]//div[1]//input[1]");
    await page.locator("//div[contains(@class,'modal-body')]//div[2]//div[1]//input[1]").fill(randomLastNames[i]);
    await page.waitForTimeout(4500);
    await highlightElement(page,"//input[@type='email']");
    await page.locator("//input[@type='email']").fill(randomEmails[i]);
    await page.waitForTimeout(4500);
    await highlightElement(page,"//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[4]/div[1]/div[1]");
    await page.locator("//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[4]/div[1]/div[1]").click({timeout:5100});
    await page.waitForTimeout(4500);
    await highlightElement(page,"//span[normalize-space()='Admin']");
    await page.locator("//span[normalize-space()='Admin']").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//div[contains(@aria-multiselectable,'false')]");
    await page.locator("//div[contains(@aria-multiselectable,'false')]").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//span[normalize-space()='Mendocino College']");
    await page.locator("//span[normalize-space()='Mendocino College']").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[7]/div[1]/div[1]");
    await page.locator("//div[contains(@class,'modal-body')]/div[contains(@class,'page-row page-flex-wrap')]/div[7]/div[1]/div[1]").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//span[normalize-space()='Testtett']");
    await page.locator("//span[normalize-space()='Testtett']").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//div[@class='ui fluid multiple search selection dropdown ais-MenuSelect']");
    await page.locator("//div[@class='ui fluid multiple search selection dropdown ais-MenuSelect']").click();
    await page.waitForTimeout(4500);
    await highlightElement(page,"//span[normalize-space()='New group added after update']");
    await page.locator("//span[normalize-space()='New group added after update']").click();
    await page.waitForTimeout(4500);
    await highlightElement(page, "//button[normalize-space(text())='Save']");
    await page.locator("//button[normalize-space(text())='Save']").click();
    await page.waitForTimeout(5100);
  }

  }
});
