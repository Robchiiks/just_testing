#features / cookies.feature
Feature: firstGet

 Scenario: Deletes one cookie
    Given A set of one cookie
    When Making a third GET call 
    Then expect to have one cookie deleted