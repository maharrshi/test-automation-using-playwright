import test, { expect } from "@playwright/test";
import testData from "../testData.json"; // Import the JSON file

const BASE_URL = testData.BASE_URL;
const postData = testData.post;
let postId;

test("Get site information", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/wp/v2/`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.namespace).toBe("wp/v2");
  expect(body.routes).toBeDefined();
});

test("Get pages", async ({ request }) => {
  const response = await request.get(
    `${BASE_URL}/wp/v2/pages?_fields=id,link,slug`
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
});

test("Get categories", async ({ request }) => {
  const response = await request.get(
    `${BASE_URL}/wp/v2/categories?_fields=id,name,slug`
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  if (body.length > 0) {
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("name");
    expect(body[0]).toHaveProperty("slug");
  }
});

test("Get media items", async ({ request }) => {
  const response = await request.get(
    `${BASE_URL}/wp/v2/media?_fields=id,source_url,alt_text`
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  if (body.length > 0) {
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("source_url");
    expect(body[0]).toHaveProperty("alt_text");
  }
});

test("Get users", async ({ request }) => {
  const response = await request.get(
    `${BASE_URL}/wp/v2/users?_fields=id,name,slug`
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  if (body.length > 0) {
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("name");
    expect(body[0]).toHaveProperty("slug");
  }
});

test("Create and delete a post", async ({ request }) => {
  // Create a new post
  const createResponse = await request.post(`${BASE_URL}/wp/v2/posts`, {
    data: postData, // Using data from JSON file
  });

  expect(createResponse.status()).toBe(201); // 201 Created
  const createdPost = await createResponse.json();
  expect(createdPost).toHaveProperty("id");

  postId = createdPost.id;
  console.log(`Post Created: ID = ${postId}`);
});

test("Get specific post by ID", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/wp/v2/posts/${postId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(postId);
  expect(body.type).toBe("post");
});

test("Delete a post", async ({ request }) => {
  // Force deletion of the post
  const deleteResponse = await request.delete(
    `${BASE_URL}/wp/v2/posts/${postId}?force=true`
  );

  expect(deleteResponse.status()).toBe(200); // 200 OK
  const deleteResult = await deleteResponse.json();
  expect(deleteResult).toHaveProperty("deleted", true);
  console.log(`Post Deleted: ID = ${postId}`);
});
