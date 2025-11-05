// services/membershipApi.js
import axios from "axios";
import { cachedFetchMembership } from "../utils/apiCache";

const API_BASE = import.meta.env.VITE_BACKEND_URL + "/membership";

// get all memberships
export const getMemberships = async (token) => {
  try {
    // For public membership info, use cache
    const data = await cachedFetchMembership();
    return { data };
  } catch (error) {
    // Fallback to direct API call if needed
    return axios.get(`${API_BASE}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};

// get membership by id
export const getMembershipById = async (id, token) => {
  return axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// register new membership
export const registerMembership = async (form, token) => {
  return axios.post(
    `${API_BASE}/register`,
    form,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// update membership status
export const updateMembershipStatus = async (id, status, token) => {
  return axios.put(
    `${API_BASE}/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// delete a membership
export const deleteMembership = async (id, token) => {
  return axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};