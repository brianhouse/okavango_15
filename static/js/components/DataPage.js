
import React, {PropTypes} from 'react'
import DataPageIndex from './DataPageIndex'
import APIExplorer from './APIExplorer'

const DataPage = () => {

  var sections = [
    {'key':1, 'title':'Overview', 'content':
      (
        <div>
          <p>
            The Okavango Database is a growing record of data generated by the explorers and scientists on their 120 day expedition to the Okavango Delta. The database encompasses <em>wildlife sightings, tweets, audio recordings</em> and <em>images</em> taken by the participants, as well as <em>sensor measurements</em> capturing things like <em>temperature, pH levels, and heart rates</em>.
          </p>
          <p>
            The intention of the Okavango Database API is to share the data in almost real-time as it’s uploaded, so that people all over the world can follow the journey as it unfolds. It also allows for others to use the data for their own purposes. Below are examples of cool things people have build with our API.
          </p>
        </div> 
      )
    },
    {'key':2, 'title':'Documentation', 'content':
      (
        <div>
          <h3>What is an API?</h3>
          <p>API stands for application programming interface, which usually involves a set of processes and commands that make it convenient for people to access computer code or information that someone has already produced. For instance, if you want to make your own app post a message to Facebook, you would probably use Facebook’s API to integrate your app with theirs.</p>
          <h3>What is a Database?</h3>
          <p>A database is an organized collection of data. For the Okavango Wildlife Database, each type of data &#8212; a wildlife sighting, image, sensor reading or audio recording, to name a few &#8212; is uploaded to an online server via satellite. As the expedition unfolds, the database will grow, holding more and more records of what the explorers and scientists have witnessed on the trip.</p>
          <h3>What is a Database API?</h3>
          <p>The Okavango Database API is the interface that allows you to ask the database to show you what’s inside. Usually, API’s are software-to-software interfaces that aren’t that easy for humans to understand. To ask the database to give you data back, you make a specific query in the form of a URL. The database is able to parse and recognize this request, and returns the data to you in some kind of structured way, like an XML or JSON file. In our case, the Okavango Database returns information in JSON (Javascript Object Notation).</p>
          <h3>Calling the API</h3>
          <p>Basically, it&#39;s like this: <code>/api/&lt;view&gt;/&lt;output&gt;?&lt;query&gt;</code></p>
          <p>The view is what kind of thing you want back. The core of the API lies in the features view, but you can also view expeditions, members and species as general lists.</p>
          <p>The output returns the data as JSON if nothing is specified, otherwise you can specify <code>map</code> to see the data plotted spatially or <code>viz</code> for a graph.</p>
          <p>The query defines the filter (ex: <code>FeatureType=sighting</code>). Multiple filters are appended with <code>&</code> in between.</p>
          <h3>API Endpoints</h3>
          <p>The following list outlines all possible methods for accessing features in the Okavango Database. These methods are also known as endpoints, and are requested with a URL. For example, to load all of the elephant sightings (limited to the first 100 by default), you would request: <code><a href="http://data.intotheokavango.org/api/features?FeatureType=sighting&SpeciesName=Elephant" target="_blank">
    http://data.intotheokavango.org/api/features?FeatureType=sighting&SpeciesName=Elephant</a></code></p>
          <p>The Elephant sightings could be filtered further, by the expedition member who saw them, geographic region, or day of expedition, for example. Each API endpoint call contains the following general information:</p>
          <p><code>limit:</code> the amount of entries returned. The default limit is 100, but this can be changed (ex: <code>limit=30</code>). Larger limits tax the database, so it is recommended to keep your limit request as small as possible.</p>
          <p><code>resolution:</code> returns a feature for every <code>resolution</code> seconds. This might be useful if you want a larger sample set or time period, but don’t want to overload a graph with every single data point. <code>full</code> returns all features.</p>
          <p><code>filter:</code> feature endpoints can be filtered by member, expedition, as well as general filters like <code>limit, resolution,</code> and <code>order.</code></p>
          <p><code>returned:</code> the amount of entries returned (this usually correlates to limit, but may be less than the limit indicated if there are fewer results in the database).</p>
          <p><code>order:</code> results are returned by default in ascending order (indicated by setting <code>order</code> to <code>ascending</code> or <code>1</code>), or descending order (indicated by setting <code>order</code> to <code>descending</code> or <code>-1</code>).</p>
          <p><code>total:</code> indicates the total amount of matching results for the query in the database, even if the amount returned is limited.</p>
          <h4>Additional Filters:</h4>
          <p><code>startDate:</code> specifies the starting date of the features to be returned. May be combined with <code>endDate.</code> Format is <code>yyyy-mm-dd</code> (ex: <code>startDate=2015-06-03</code>).</p>
          <p><code>endDate:</code> specifies the ending date of the features to be returned. May be combined with <code>startDate.</code> Format is <code>yyyy-mm-dd</code> (ex: <code>endDate=2015-06-03</code>).</p>
          <p><code>geoBounds:</code> upper left (NW), lower right (SE): lon_1,lat_1,lon_2,lat_2. So the Okavango Delta is something like <code>geoBounds=20,-17,26,-22</code></p>
          <p><code>expeditionDay:</code> returns data from a specific day of the expedition (ex: <code>expeditionDay=1</code>)</p>
          <h4>View Endpoints:</h4>
          <p>These endpoints offer overviews of all the members, expeditions and species that could be used to further filter features in the database.</p>
          <p><code>members:</code> reveals an array of features associated with each member. Endpoint url: <code><a href="http://data.intotheokavango.org/api/members" target="_blank">http://data.intotheokavango.org/api/members</a></code></p>
          <p><code>expeditions:</code> reveals all of the expeditions to the Okavango Delta, along with start date and duration. Endpoint url: <code><a href="http://data.intotheokavango.org/api/expeditions" target="_blank">http://data.intotheokavango.org/api/expeditions</a></code></p>
          <p><code>species:</code> reveals all of the species sightings on the expeditions. Endpoint url: <code><a href="http://data.intotheokavango.org/api/species" target="_blank">http://data.intotheokavango.org/api/species</a></code></p>
          <h4>Features Endpoints:</h4>
          <p>If you try to call the features view, the format looks quite different from the other view endpoints. This is because the Features view contains the bulk of what’s in the database, and is the main collection to be searched and filtered.</p>
          <p>The primary way to filter the features is by <code>FeatureType</code> (ex: <code>FeatureType=ambit</code>).</p>
          <p>Here is a list of the possible FeatureTypes, and the data they contain: </p>
          <p><code>ambit:</code> contains heart rate and other activity data captured from ambit watches worn by certain explorers.</p>
          <p><code>ambit_geo:</code> contains geolocation data from the ambit watches.</p>
          <p><code>audio:</code> audio recordings taken in the field.</p>
          <p><code>beacon:</code> geolocation data sent by beacons every 30 minutes.</p>
          <p><code>image:</code> all images uploaded to the database. These can be filtered further by <code>ImageType: GoPro, Documentary</code> or <code>Specimen.</code></p>
          <p><code>sensor:</code> sensor readings taken by environmental sensors attached to the expedition boat. Data includes temperature, pH levels and other environmental readings.</p>
          <p><code>sighting:</code> all species sightings on the expedition. You can further filter by <code>SpeciesName</code> (ex: <code>SpeciesName=Elephant</code>). The results return a timestamped geolocated point, with a <code>Count</code> of how many species were sighted, as well as images if they were taken. A <code>Taxonomy</code> object returns the scientific name, and a <code>Notes</code> field records a description uploaded with the sighting.</p>
          <p><code>tweet:</code> a list of all tweets with the hashtag #okavango15.</p>
          <p><code>longform:</code> returns longform blog entries posted to the okavango collection on <a href="https://medium.com/tag/okavango15" target="_blank">Medium.</a></p>
        </div>
      )
    }
  ]

  var index = sections.map(function(section){
    return <h3 key={section.key}>{section.key} - {section.title}</h3>
  })

  var content = sections.map(function(section){
    return (
      <div key={section.key}>
        <h2>{section.key} - {section.title}</h2>
        {section.content}
      </div>
    )
  })

  return (
    <div  className='page'  id="dataPage">
      <DataPageIndex>
        {index}
      </DataPageIndex>
      <div id="dataPageContent">
        {content}
      </div>
    </div>
  )  
}

DataPage.propTypes = {
  // active: PropTypes.bool.isRequired
}

export default DataPage