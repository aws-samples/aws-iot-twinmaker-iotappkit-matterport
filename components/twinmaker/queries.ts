import { TwinMakerQuery } from "@iot-app-kit/source-iottwinmaker";

export const entity_queries: TwinMakerQuery[] = [
    {
        entityId: 'urn:ngsi-ld:IndoorEnvironmentObserved:IndoorEnvironment-AM103-24e124725c140471',
        componentName: 'IndoorEnvironmentObservedComponent',
        properties: [
          { propertyName: 'temperature', refId: 'temperature'}, 
          { propertyName: 'relativehumidity', refId: "humidity"},
          { propertyName: 'co2', refId: "co2"}
         ],
    }
]