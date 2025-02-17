report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/orangehrm_visual_tests_Admin_Dashboard_Verification_0_body_0_desktop.png",
        "test": "../bitmaps_test/20250214-190735/orangehrm_visual_tests_Admin_Dashboard_Verification_0_body_0_desktop.png",
        "selector": "body",
        "fileName": "orangehrm_visual_tests_Admin_Dashboard_Verification_0_body_0_desktop.png",
        "label": "Admin Dashboard Verification",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0,
          "misMatchPercentage": "0.00",
          "analysisTime": 12
        }
      },
      "status": "pass"
    }
  ],
  "id": "orangehrm_visual_tests"
});