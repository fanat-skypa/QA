
| Scenario | Request data | Expected decision | Expected risk | Status code |
|----------|--------------|-------------------|--------------|--------------|
| Negative | Valid data, bad request | REJECTED | HIGH | 200 |
| Positive | Valid data | APPROVED | MEDIUM | 200 |
| Positive | Valid data | APPROVED | LOW | 200 |
