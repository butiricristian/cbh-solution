const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const findCandidate = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }
  if (event.partitionKey) {
    return event.partitionKey;
  }
  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const ensureCandidateIsStringified = (candidate) => {
  if (typeof candidate === 'string') {
    return candidate
  }

  return JSON.stringify(candidate);
}

const ensureCandidateSatsfiesMaxKeyLength = (candidate) => {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate
}

exports.deterministicPartitionKey = (event) => {
  let candidate = findCandidate(event);
  candidate = ensureCandidateIsStringified(candidate)
  candidate = ensureCandidateSatsfiesMaxKeyLength(candidate)

  return candidate;
};
