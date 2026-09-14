export class ApiBaseError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'ApiBaseError';
  }
}

export class NetworkError extends ApiBaseError {
  constructor(message = 'Erreur de connexion réseau') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class UnauthorizedError extends ApiBaseError {
  constructor(message = 'Session expirée ou non autorisée') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class RateLimitError extends ApiBaseError {
  constructor(message = 'Trop de requêtes. Veuillez patienter.') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends ApiBaseError {
  constructor(message = 'Données fournies invalides') {
    super(message, 422);
    this.name = 'ValidationError';
  }
}

export class ProviderError extends ApiBaseError {
  constructor(providerName: string, message = 'Échec du fournisseur externe') {
    super(`[${providerName}] ${message}`, 502);
    this.name = 'ProviderError';
  }
}
