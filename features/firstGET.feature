#features / cookies.feature
Feature: firstGet

Scenario: First GET call
Given A set of three cookies
When Making a GET call
Then expect to have set of three cookies added
