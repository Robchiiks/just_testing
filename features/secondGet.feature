#features / cookies.feature
Feature: secondGet

Scenario: Expect previous cookies
    Given A second response
    When Making a second GET call
    Then expect to have previously set cookies added
