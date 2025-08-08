// Dependency injection container for services

import { CallService } from './CallService';
import { NotesService } from './NotesService';
import { SessionService } from './SessionService';
import type { ServiceContainer } from './types';

// Global service container instance
let serviceContainer: ServiceContainer | null = null;

export function createServiceContainer(): ServiceContainer {
  if (serviceContainer) {
    return serviceContainer;
  }

  const container: ServiceContainer = {
    callService: new CallService(),
    notesService: new NotesService(),
    sessionService: new SessionService()
  };

  serviceContainer = container;
  return container;
}

export function getServiceContainer(): ServiceContainer {
  if (!serviceContainer) {
    return createServiceContainer();
  }
  return serviceContainer;
}

// Individual service getters for convenience
export function getCallService() {
  return getServiceContainer().callService;
}

export function getNotesService() {
  return getServiceContainer().notesService;
}

export function getSessionService() {
  return getServiceContainer().sessionService;
}

// Cleanup function for testing or session end
export function resetServiceContainer() {
  if (serviceContainer) {
    // Cleanup existing services
    serviceContainer.notesService.cleanup?.();
    serviceContainer = null;
  }
}

// React hook for using services
import { useEffect, useState } from 'react';

export function useServices() {
  const [services] = useState(() => getServiceContainer());
  
  useEffect(() => {
    return () => {
      // Optional cleanup on unmount
    };
  }, []);

  return services;
}