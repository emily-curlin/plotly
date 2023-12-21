// start of Emily's app.js file
// ensure there is a connection
console.log("connection status")

/*
Complete the following steps:
1) Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

Fetch the JSON data and console log it at 
d3.json(roadster).then(function(data) {
    console.log(data);});
}
*/
//Create a variable to store the data imported from server 
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/*
2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Use sample_values as the values for the bar chart (sample tag within console).
Use otu_ids as the labels for the bar chart.
Use otu_labels as the hovertext for the chart.
bar Chart
*/

function ChartBuilder(sample) {
  console.log("testing ChartBuilder function")
  d3.json(sample_data).then(function (data) {
      console.log("This is sample data")
      console.log(data);

      //need to build the barchart will need samples object. 
      let samples = data.samples
      //view in console 
      console.log(samples);
      //filter sample for the given sample (i.e. 945), will get an array as a sample
      let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
      //view sampleArray
      console.log(sampleArray);
      //unpack the object from within the array
      let sampleResult = sampleArray[0];
      // console.log(sampleResult);
      // console.log("This is sample Results")
      let otu_labels = sampleResult.otu_labels;
      //console.log(otu_labels)
      let sample_values = sampleResult.sample_values;
      // console.log(sample_values)
      let otu_ids = sampleResult.otu_ids
      // console.log(otu_ids)
      // console.log("Proof of defining otu_ids

      // Build a Bubble Chart
      // Create a bubble chart that displays each sample.
      // Use otu_ids for the x values.
      // Use sample_values for the y values.
      // Use sample_values for the marker size.
      // Use otu_ids for the marker colors.
      // Use otu_labels for the text values.
      let traceBubble = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Picnic'}
        }

      let layoutBubble = {
        title: "Bacteria Count per Sample",
        showlegend: false,
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
        };

      let bubbleData= [traceBubble];

      Plotly.newPlot('bubble', bubbleData, layoutBubble);

      //Create Horizontal Bar Chart 
      // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
      // Use sample_values as the values for the bar chart.
      // Use otu_ids as the labels for the bar chart.
      // Use otu_labels as the hovertext for the chart.

      let traceBar = [{
        type: "bar",
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(10).map(otuID => `OTU ${otuID}`).reverse(),
        orientation: 'h',
        text: otu_labels.slice(0,10).reverse()
      }];

      let barData= traceBar

      let layoutBar = {
        title: '10 Most Common Bacteria',
        barmode: 'stack'
      };

      Plotly.newPlot('bar', barData, layoutBar);
        
  });
}
    // 4. Display the sample metadata, i.e., an individual's demographic information.
    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.

  function Metadata_builder(sample){
    d3.json(sample_data).then(function (data) {
      // console.log(sampleResult);
      // console.log("This is sample Results")
      let metadata= data.metadata;
      console.log(metadata);
      //filter sample for the given sample (i.e. 945), will get an array as a sample
      let metadataArray = metadata.filter(metadataObject => metadataObject.id == sample);
      //view metadataArray
      console.log(metadataArray);
      //unpack the object from within the array
      let metadataResult = metadataArray[0];
      console.log(metadataResult);
      
      //use d3 select method to get from <div id="sample-metadata" class="panel-body"></div> indexECC.html
      //using id to select sample metadata 
      let metadatapanel = d3.select("#sample-metadata")
      //Assign empty string to HTML to clear out metadatapanel
      metadatapanel.html("");
      //Iterate over each key value pair in the metadataresult and append to the metadataPanel
      for (key in metadataResult){
        metadatapanel.append("h5").text(`${key.toUpperCase()}: ${metadataResult[key]}`);
      };
    });
  }

  // 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard
    //initialize the function 
    function optionChanged(newSample){
      ChartBuilder(firstSample);
      Metadata_builder(firstSample);
    }


    function initialize() {
      //inset pulldown menu using code from MDN web docs 
      //<select id="selDataset" onchange="optionChanged(this.value)"></select>
      //refernce class within in html doc, use d3 select to get <select id="selDataset" onchange="optionChanged(this.value)"></select>
      //start with pulldown select and chain 
      let pulldownSelect= d3.select("#selDataset");

      d3.json(sample_data).then(function (data) {
        let sampleNames =data.names;
        console.log(sampleNames)

          for (let index = 0; index < sampleNames.length; index++) {
            pulldownSelect
            .append("option")
            .text(sampleNames[index])
            .property("value", sampleNames[index])
        
          // Use the first sample from the list to build the initial plots
            let firstSample = sampleNames[0];
            ChartBuilder(firstSample);
            Metadata_builder(firstSample);  
          }
    });
  } 

  // 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard
    //initialize the function 
    function optionChanged(newSample){
      ChartBuilder(newSample);
     Metadata_builder(newSample);
    }

    // 7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

    initialize();
  