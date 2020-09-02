#features / cookies.feature
Feature: firstGet

Scenario: First GET call
Given A set of three cookies
When Making a GET call that appends cookies
Then expect to have set of three cookies added and delete one later
