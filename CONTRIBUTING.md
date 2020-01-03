# How to Contribute
1. Fork the project & clone locally

2. Create an upstream remote and sync your local copy before you branch 
    ```sh
    git remote add upstream git@github.com:HubSpotWebTeam/hs-node-api.git
    ```
    
3. Create a `.env` file in the root of your folder for all `process.env` tokens, such as the HAPIkey. e.g.
    ```
    E2E_TESTS_HAPI_KEY="your-hapi-key"
    E2E_TESTS_BLOG_ID="1234567"
    E2E_TESTS_WORKFLOW_ID="9876542"
    E2E_TESTS_CONTACT_EMAIL="coolrobot@hubspot.com"
    E2E_TESTS_CONTACT_ID="1234"
    E2E_TESTS_HUBDB_TABLE_ID="999999"
    E2E_TESTS_HUBDB_PORTAL_ID="111111"
    E2E_TESTS_LAYOUT_ID="1234567785"
    E2E_TESTS_LAYOUT_VERSION_ID="1234567894"
    E2E_TESTS_PAGE_ID="1234567"
    E2E_TESTS_TEMPLATE_PATH="generated_layouts/1234567.html"
    ```
3. Create a new branch for each separate piece of work following the convention `contribution_type/some-detail` e.g. `improvement/update-contribution-docs`

4. Make your changes & ensure tests are passing 
    ```sh
    npm run build && npm test
    ```
5. Create a new PR in GitHub and within the body notify one of the repo maintainers
