# Session 2: Enterprise Workspace Security & Setup

**Instructor**: In this second session, we examine enterprise-grade Azure ML workspace architecture.

**Key Discussion**:
- When setting up an enterprise workspace, default public endpoints are rarely acceptable.
- We configure Azure Private DNS zones, secure storage accounts with managed identities, and bind workspace outbound traffic to user-defined routing (UDR) through an Azure Firewall.
- We also reviewed role assignments: AzureML Data Scientist vs AzureML Compute Operator vs custom RBAC definitions.
