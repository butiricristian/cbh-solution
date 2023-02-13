const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  describe("Event contains a partitionKey", () => {
    it("Returns the event's partition key", () => {
      const event = {
        partitionKey: "123",
      };
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe("123");
    });

    it("Returns the event's partition key converted to string", () => {
      const event = {
        partitionKey: 123,
      };
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe("123");
    });

    it("Returns the event's hashed partition key when longer than 256 characters", () => {
      const event = {
        partitionKey: new Array(300).join("x"),
      };
      const partitionKey = deterministicPartitionKey(event);
      const exepectedHash = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
      expect(partitionKey).toBe(exepectedHash);
    });
  })

  describe("Event doesn't contain a partitionKey", () => {
    it("Returns the sha3-512 hashed event", () => {
      const event = {
        name: "Event 1",
        description: "Description 1"
      };
      const partitionKey = deterministicPartitionKey(event);
      const data = JSON.stringify(event)
      const exepectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
      expect(partitionKey).toBe(exepectedHash);
    });
  })
});
