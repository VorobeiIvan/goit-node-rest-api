import request from "supertest";
import app from "../app.js";

describe("Contacts API", () => {
  let contactId;

  it("should get all contacts", async () => {
    const response = await request(app).get("/api/contacts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should create a new contact", async () => {
    const newContact = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123456789"
    };
    const response = await request(app)
      .post("/api/contacts")
      .send(newContact);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newContact);
    contactId = response.body.id; // Збережіть id нового контакту для подальших тестів
  });

  it("should get a contact by id", async () => {
    const response = await request(app).get(`/api/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);
  });

  it("should update a contact", async () => {
    const updatedContact = {
      name: "Jane Doe",
      email: "jane.doe@example.com"
    };
    const response = await request(app)
      .put(`/api/contacts/${contactId}`)
      .send(updatedContact);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedContact);
  });

  it("should return 400 if no fields are provided for update", async () => {
    const response = await request(app)
      .put(`/api/contacts/${contactId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Body must have at least one field");
  });

  it("should delete a contact", async () => {
    const response = await request(app).delete(`/api/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);
  });

  it("should return 404 if contact not found", async () => {
    const response = await request(app).get(`/api/contacts/nonexistent-id`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Not found");
  });
});
