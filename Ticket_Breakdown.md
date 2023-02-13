# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Preparing the split up

There are 3 main steps to be taken here:
  - Adding a custom id to the Agent, which should be filled in by the user
  - Returning the custom id in the agent metadata from `getShiftsByFacility`
  - Adding the new custom id to the report

## Your Breakdown Here

1. Add new `custom_id` field to Agents table
    We are required to add a new `custom_id` field to the Agents table in the database.
    The new field should be of type string.
    No special validation is required.

    Acceptance criteria:
    - Agents table contains `custom_id` field

2. Add a new ID field to the agent creation flow
    The agent creation page will have a new text input called ID.
    The information set in this input will be saved in the `custom_id` column in the Agents table.

    Acceptance criteria:
    - When creating a new agent, the user will have the ability to set an ID for the agent

    Blocked by Ticket #1


3. Add a new ID field to the agent update flow
    The agent update page will have a new text input called ID.
    The information set in this input will be saved in the `custom_id` column in the Agents table.

    Acceptance criteria:
    - When updating an existing agent, the user will have the ability to set an ID for the agent or update an existing one

    Blocked by Ticket #1

4. Include `custom_id` in the Agent metadata returned by `getShiftsByFacility`
    Add `custom_id` from the Agents table to the Agent metadata returned by the `getShiftsByFacility` method

    Acceptance criteria:
    - Agent metadata returned when calling `getShiftsByFacility` should contain the `custom_id` field

    Blocked by Ticket #1

5. Replace the Agent `id` column with `custom_id` in the report method
    In the `generateReport` method we need to verify 2 cases when iterating through the list of shifts.
    In the Agent metadata for the current shift:
      - If a value exists (is not `undefined` or `null`) for the `custom_id` field then we set the value of the ID column in the report to the value of the `custom_id` field
      - If the `custom_id` field is missing or its value is not present (`undefined` or `null`) then we keep the current logic of setting the ID column to the Agents internal database id

    Acceptance criteria:
    - If the agent has a custom id set, the ID column in the report should contain the value for custom id
    - If the agent has no custom id, the ID column in the report should contain the value for the internal database id

    Blocked by Ticket #1
