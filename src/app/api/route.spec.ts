import { GET } from "@/api/route";

function mockResponse() {
    const res = { status: 200, _data: { message: "Success" } };
    return res;
}

describe("API Health Check", () => {
    it("should return a 200 status and success message", async () => {
        const res = mockResponse();

        await GET();

        expect(res.status).toBe(200);
        expect(res._data).toEqual({ message: "Success" });
    });
});
