import axios from 'axios';
import { data } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /*
   ****************************** User Routes **************************************************
   * */

  /**
   * Get details on a user by username
   *
   * @param {String} username - unique usernmae
   * @returns {Object} found user details
   */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Update details of a user by username
   *
   * @param {String} username - unique usernmae
   * @param {String} firstName - User's first name
   * @param {String} lastName - User's last name
   * @param {String} email - User's email
   * @returns {Object} updated user details
   */

  static async updateUser(username, firstName, lastName, email) {
    let res = await this.request(`users/${username}`, { firstName, lastName, email }, 'patch');
    return res.user;
  }

  /**
   * Apply for a job
   *
   * @param {String} username - unique usernmae
   * @param {Int} jobId - Job id
   * @returns {Int} applied job id
   */

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, { id: jobId }, 'post');
    return res.applied;
  }
  /*
   ****************************** Company Routes **************************************************
   * */

  /**
   * Get details on a company by handle
   *
   * @param {String} handle - unique handle of company
   * @returns {Object} found company details
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * Get a list of all companies
   *
   * @param {String} q - name to filter by
   * @returns {Array} list of found companies
   */

  static async getCompanies(q = '') {
    const name = q.length > 0 ? q : undefined;
    let res = await this.request(`companies/`, { name });
    return res;
  }

  /*
   ****************************** Company Routes **************************************************
   * */

  /**
   * Get a list of all jobs
   *
   * @param {String} q - name to filter by
   * @returns {Array} list of found jobs
   */

  static async getJobs(q = '') {
    const title = q.length > 0 ? q : undefined;
    let res = await this.request(`jobs/`, { title });
    return res;
  }

  /*
   ****************************** Authorization Routes **************************************************
   * */

  /**
   * Register a user
   *
   * @param {String} username - username of new user
   * @param {String} password - password of new user
   * @param {String} firstName - first name of new user
   * @param {String} lastName - last name of new user
   * @param {String} email - email of new user
   * @returns {boolean} true if registeration is successful
   */
  static async register(username, password, firstName, lastName, email) {
    let res = await this.request(`auth/register`, { username, password, firstName, lastName, email }, 'post');
    JoblyApi.token = res.token;
    return res.token;
  }

  /**
   * Login a user
   *
   * @param {String} username - username of new user
   * @param {String} password - password of new user
   */
  static async login(username, password) {
    let res = await this.request(`auth/token`, { username, password }, 'post');
    JoblyApi.token = res.token;
    return res.token;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' + 'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' + 'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
