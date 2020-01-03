require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const uuid = require('node-uuid');
const { schemaTemplate, validate } = require('./schemas/template');

const { E2E_TESTS_HAPI_KEY: hapikey } = process.env;

const hs = new HubSpotClient({ hapikey });

// FIXME: This test is failing.
describe('Templates', () => {
  describe('Working with templates', async () => {
    const guid = uuid.v4();
    const path = `/Coded Files/Custom/page/Web_Team/E2E_TESTING/${guid}.html`;
    const folder = 'Web_Team/E2E_TESTING';
    let source = `<p>Test ${guid}.</p>`;
    const template_type = 4;
    let id;

    it('creates a template in a portal and returns an id', async () => {
      const payload = {
        source,
        path,
        folder,
        template_type
      };

      const template = await hs.templates.createTemplate(payload);
      ({ id } = template);
      expect(id.toString()).to.not.equal('');
      return Promise.resolve();
    });

    it('retrieves a template by id', async () => {
      const template = await hs.templates.getTemplate(id);
      expect(validate(template, schemaTemplate).error).to.be.a('null');
      return Promise.resolve();
    });

    it('updates a template in a portal', async () => {
      try {
        source = '<p>Test updated</p>';
        const { source: newSource } = await hs.templates.updateTemplate(id, {
          source
        });
        expect(newSource).to.equal(source);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('updates the autosave buffer for a template', async () => {
      try {
        source = '<p>Test updating autosave buffer</p>';

        // Update the autosave buffer with this content
        await hs.templates.updateAutosaveBuffer(id, {
          source
        });

        // Get the autosave buffer and determine if it is equal to the updated value
        const {
          source: updatedBufferSource
        } = await hs.templates.getUpdatedAutosaveBuffer(id);

        expect(updatedBufferSource).to.equal(source);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('returns true if the buffer contains changes', async () => {
      try {
        source = '<p>Test updating autosave buffer for a second time</p>';

        // Update the autosave buffer with this content
        await hs.templates.updateAutosaveBuffer(id, {
          source
        });

        // Get the autosave buffer and determine if it is equal to the updated value
        const hasChanges = await hs.templates.hasBufferedChanges(id);

        // eslint-disable-next-line no-unused-expressions
        expect(hasChanges).to.be.true;

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('pushes buffered changes live', async () => {
      try {
        source = '<p>Test pushing buffered changes live</p>';

        // Update the autosave buffer with this content
        await hs.templates.updateAutosaveBuffer(id, {
          source
        });

        // Publish the autosave buffer
        await hs.templates.pushBufferedChangesLive(id);

        // Get the live content and determine if it is equal to the updated value
        const { source: liveSource } = await hs.templates.getTemplate(id);

        // eslint-disable-next-line no-unused-expressions
        expect(liveSource).to.equal(source);

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('gets all versions of a template', async () => {
      try {
        const versions = await hs.templates.getVersions(id);
        // Should have 3 versions (based on tests above)
        expect(versions).to.be.an('array');
        expect(versions).to.have.lengthOf(3);

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });

    it('deletes a previously created template by id', async () => {
      try {
        const response = await hs.templates.deleteTemplate(id);
        // eslint-disable-next-line no-unused-expressions
        expect(response.deleted).to.be.true;
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    });
  });
});
