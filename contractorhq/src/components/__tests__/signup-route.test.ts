/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from "@/app/api/signup/route";
import User from "@/lib/models/User";

jest.mock("@/lib/db", () => ({
  connectToDatabase: jest.fn(),
}));

// Mock User model methods
jest.mock("@/lib/models/User", () => {
  const actual = jest.requireActual("@/lib/models/User");
  return {
    ...actual,
    findOne: jest.fn(),
  };
});

const createRequest = (body: object) => ({
  json: async () => body,
});

describe("POST /api/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if required fields are missing", async () => {
    const req = createRequest({ email: "test@example.com" });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing required fields");
  });

  it("returns 400 if user already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "test@example.com",
    });

    const req = createRequest({
      name: "Test User",
      email: "test@example.com",
      password: "Aa1!aaaa",
    });

    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("User already exists");
  });

  it("creates new user successfully", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const saveMock = jest.fn().mockResolvedValue(true);
    // Mock the User constructor to return an object with a save method
    jest.spyOn(User.prototype, "save").mockImplementation(saveMock);

    const req = createRequest({
      name: "Test User",
      email: "test@example.com",
      password: "Aa1!aaaa!",
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.message).toBe("User created");
  });
});
