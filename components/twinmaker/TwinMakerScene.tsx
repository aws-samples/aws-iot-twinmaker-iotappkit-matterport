'use client'
import useAuth from '@/hooks/useAuth'
import { TwinMakerQuery, initialize } from '@iot-app-kit/source-iottwinmaker'
import { TimeSeriesDataQuery } from "@iot-app-kit/core"
import  {useState, useMemo, useEffect } from 'react'
import { S3SceneLoader } from '@iot-app-kit/source-iottwinmaker/dist/es/scene-module/S3SceneLoader'
import { SceneMetadataModule } from '@iot-app-kit/source-iottwinmaker/dist/es/scene-module/SceneMetadataModule'
import { twinmaker_config } from '@/aws.config'
import { entity_queries } from './queries'
import { SceneViewer } from '@iot-app-kit/scene-composer'


interface twinMakerDataProps {
    query: { timeSeriesData: (query: TwinMakerQuery) => TimeSeriesDataQuery}
    s3SceneLoader: (sceneId: string) => S3SceneLoader
    sceneMetadataModule: (sceneId: string) => SceneMetadataModule
  }

const TwinMakerScene = () => {

const {isAuthenticated, credentials} = useAuth()
const [mounted, setmounted] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const mpSdk = await document.querySelector<any>('matterport-viewer')?.playingPromise
        setmounted(true)
      } catch (e) {
        console.log(e)
      }
  
      }

  load()
  }, [isAuthenticated])
  

const twinMakerData: twinMakerDataProps | null = useMemo(() => {

    if (isAuthenticated) {

        return initialize(twinmaker_config.twinmaker_workspace_id, {
          awsCredentials: credentials, 
          awsRegion: twinmaker_config.twinmaker_region
        })
    }
    return null
  }
, [isAuthenticated, credentials])


return (
    <>
    
    { twinMakerData && isAuthenticated && mounted ? (     
    <SceneViewer 
    sceneLoader= {twinMakerData.s3SceneLoader(twinmaker_config.twinmaker_scene_id)}
    sceneMetadataModule={twinMakerData.sceneMetadataModule(twinmaker_config.twinmaker_scene_id)}
    queries={entity_queries.map((q) => twinMakerData.query.timeSeriesData(q))}
    viewport={{duration: twinmaker_config.twinmaker_viewport_duration}}
    externalLibraryConfig={{matterport: { assetBase: '/matterport'}}}
 
    />
    
    ):
    (<></>)


}



    </>
)

}

export default TwinMakerScene

