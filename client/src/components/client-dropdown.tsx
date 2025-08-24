import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronsUpDown, UserPlus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { Client } from '@shared/schema';

interface ClientDropdownProps {
  selectedClient: Client | null;
  onClientSelect: (client: Client | null) => void;
  onNewClientClick: () => void;
  onEditClientClick?: (client: Client) => void;
  className?: string;
}

/**
 * ClientDropdown component provides a searchable dropdown for selecting clients
 * Fetches clients from the backend and allows selection with search functionality
 */
export function ClientDropdown({ 
  selectedClient, 
  onClientSelect, 
  onNewClientClick,
  onEditClientClick,
  className 
}: ClientDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Fetch clients from the backend
  const { 
    data: clients = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['/api/clients'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/clients');
      return response.json() as Promise<Client[]>;
    },
    retry: 1,
    staleTime: 0, // Always fetch fresh data to catch new clients
  });

  // Handle client selection
  const handleClientSelect = (client: Client) => {
    onClientSelect(client);
    setOpen(false);
    setSearchValue('');
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    onClientSelect(null);
    setOpen(false);
    setSearchValue('');
  };

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    (client.company && client.company.toLowerCase().includes(searchValue.toLowerCase())) ||
    client.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Client
      </label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 border-gray-200 hover:border-gray-300"
            disabled={isLoading}
          >
            {selectedClient ? (
              <div className="flex flex-col items-start overflow-hidden">
                <span className="font-medium text-sm truncate">
                  {selectedClient.company || 'No Company'}
                </span>
              </div>
            ) : (
              <span className="text-gray-500">
                {isLoading ? "Loading clients..." : "Select a client..."}
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search clients..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 mb-3">No clients found</p>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setOpen(false);
                      onNewClientClick();
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Client
                  </Button>
                </div>
              </CommandEmpty>
              
              <CommandGroup>
                {/* Clear selection option */}
                {selectedClient && (
                  <CommandItem
                    value="clear-selection"
                    onSelect={handleClearSelection}
                    className="text-gray-500 italic"
                  >
                    <Check className="mr-2 h-4 w-4 opacity-0" />
                    Clear selection
                  </CommandItem>
                )}
                
                {/* Client list */}
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={`${client.name}-${client.company || ''}`}
                    onSelect={() => handleClientSelect(client)}
                    className="group"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedClient?.id === client.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium text-sm truncate">
                        {client.company || 'No Company'}
                      </span>
                    </div>
                    {onEditClientClick && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(false);
                          onEditClientClick(client);
                        }}
                        className="ml-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all duration-150"
                        title="Edit client"
                      >
                        <Settings className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                      </button>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              
              {/* Add new client option */}
              {filteredClients.length > 0 && (
                <CommandGroup>
                  <CommandItem
                    value="add-new-client"
                    onSelect={() => {
                      setOpen(false);
                      onNewClientClick();
                    }}
                    className="border-t border-gray-100"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Client
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {/* Error state */}
      {error && (
        <div className="text-xs text-red-600">
          Failed to load clients. 
          <button 
            onClick={() => refetch()} 
            className="ml-1 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}