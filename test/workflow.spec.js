require('dotenv').config();
const HubSpotAPI = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const {
  schemaWorkflows,
  schemaWorkflow,
  validate
} = require('./schemas/workflows');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_WORKFLOW_ID,
  E2E_TESTS_CONTACT_EMAIL: email,
  E2E_TESTS_CONTACT_ID: vid
} = process.env;

const hs = new HubSpotAPI({ hapikey });

// Set up some test data
const name = `Workflow created by API integration testing scripts at ${new Date().getTime()}`;
const type = 'DRIP_DELAY';
const workflowPayload = {
  name,
  type,
  enabled: true,
  onlyEnrollsManually: true,
  actions: [
    {
      type: 'DELAY',
      delayMillis: 3600000
    },
    {
      newValue: 'HubSpot',
      propertyName: 'company',
      type: 'SET_CONTACT_PROPERTY'
    },
    {
      type: 'WEBHOOK',
      url: 'https://www.myintegration.com/webhook.php',
      method: 'POST',
      authCreds: {
        user: 'user',
        password: 'password'
      }
    }
  ]
};

// For global storage
const createdWorkflow = {};

describe('Workflows', async () => {
  describe('Retrieving Workflows', async () => {
    it('returns a valid workflow list', async () => {
      const workflows = await hs.workflows.getAll();
      expect(validate(workflows, schemaWorkflows).error).to.be.a('null');
      return Promise.resolve();
    });

    it('returns a valid workflow', async () => {
      const workflowById = await hs.workflows.getWorkflow(
        E2E_TESTS_WORKFLOW_ID
      );
      expect(validate(workflowById, schemaWorkflow).error).to.be.a('null');
      return Promise.resolve();
    });
  });

  describe('Mutating Workflows', async () => {
    it('creates a new workflow', async () => {
      const newWorkflow = await hs.workflows.createWorkflow(workflowPayload);
      // Store this globally, so we can update/delete the same one.
      Object.assign(createdWorkflow, newWorkflow);

      expect(newWorkflow.name)
        .to.be.a('string')
        .and.to.equal(name);
      expect(newWorkflow.type)
        .to.be.a('string')
        .and.to.equal(type);
      expect(newWorkflow.actions)
        .to.be.an('array')
        .and.to.have.lengthOf(3);
      return Promise.resolve();
    });

    it('updates a workflow with new actions', async () => {
      // Add another action to the workflow
      const updatedWorkflowProperties = Object.assign({}, createdWorkflow, {
        actions: createdWorkflow.actions.concat({
          type: 'DELAY',
          delayMillis: 3600000
        })
      });

      const updatedWorkflow = await hs.workflows.updateWorkflow(
        updatedWorkflowProperties
      );
      expect(updatedWorkflow.actions)
        .to.be.an('array')
        .and.to.have.lengthOf(4);
      return Promise.resolve();
    });
  });

  describe('Enrolling/unenrolling contacts in workflows', async () => {
    it('enrolls a contact in to an existing workflow', async () => {
      const enrollment = await hs.workflows.enrollContact({
        workflowId: createdWorkflow.id,
        email
      });
      expect(enrollment).to.be.a('object');
      expect(enrollment.enrolled).to.equal(true);
      return Promise.resolve();
    });

    it('gets a list of enrollments for a specified contact and should have at least one (1) enrollment', async () => {
      const enrollments = await hs.workflows.getEnrollments(vid);
      expect(enrollments)
        .to.be.an('array', 'Enrollments is not an array')
        .and.to.have.lengthOf.at.least(1, 'Must have at least 1 enrollment');
      return Promise.resolve();
    });

    it('unenrolls a contact from a pre-existing workflow', async () => {
      const enrollment = await hs.workflows.unenrollContact({
        workflowId: createdWorkflow.id,
        email
      });
      expect(enrollment).to.be.a('object');
      expect(enrollment.unenrolled).to.equal(true);
      return Promise.resolve();
    });
  });

  describe('Retrieving event logs', async () => {
    // FIXME: Fix this test
    xit('retrieves an event log for a specific workflowId', async () => {
      const eventLogs = await hs.workflows.getWorkflowEventLog({
        workflowId: createdWorkflow.id
      });
      debug(eventLogs);

      expect(eventLogs.objects).to.be.an('array');
      return Promise.resolve();
    });
  });

  describe('Deleting Workflows', async () => {
    it('deletes a workflow', async () => {
      const deletedWorkflow = await hs.workflows.deleteWorkflow(
        createdWorkflow.id
      );
      expect(deletedWorkflow).to.be.an('object');
      expect(deletedWorkflow.deleted).to.equal(true);
      return Promise.resolve();
    });
  });
});
