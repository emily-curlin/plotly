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


//Fetch the data and make it viewable in console

d3.json(sample_data).then(function(data) {
    console.log("This is sample data")
    console.log(data);




//Next step is to pull data out of json from live server. 

//Data is not available below this point 


/*
2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Use sample_values as the values for the bar chart (sample tag within console).
Use otu_ids as the labels for the bar chart.
Use otu_labels as the hovertext for the chart.
bar Chart
*/

function ChartBuilder(sample){
    console.log("testing ChartBuilder function");
    d3.json(sample_data).then(function(data) {
        console.log("This is sample data")
        console.log(data);
    
        //need to build the barchart will need samples object. 
        let samples = data.samples
        //view in console 
        console.log(samples);
        //filter sample for the given sample (i.e. 945), will get an array as a sample
        let sampleArray= samples.filter(sampleObject => sampleObject.id ==sample);
        //view sampleArray
        console.log(sampleArray);
        //unpack the object from within the array
        let result= sampleArray[0];
        // console.log(sampleResult);
        // console.log("This is sample Results")
        // //create variables for Use otu_ids as the labels for the bar chartUse otu_labels as the hovertext for the chart.
        
        let otu_labels = result.otu_labels;
        // console.log(otu_labels)
        let sample_values = result.sample_values;
        // console.log(sample_values)
        let otu_ids = result.otu_ids
        // console.log(otu_ids)
        // console.log("Proof of defining otu_ids"


// Build a Bubble Chart
// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

let layoutBubble = {
    title: "Bacteria Count per Sample",
    showlegend: false,
    xaxis: {title: "OTU ID"},
    yaxis: {title: "Sample Values"}
  };
  
let bubbleData = [
  {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
      size: sample_values, 
      color: otu_ids, 
      colorscale: 'Picnic'}
      // type: 'heatmap'
    }]

    Plotly.newPlot('bubble', bubbleData, layoutBubble);
  });
}




//     let bubbleChart = {
//         title: "Bacteria Cultures Per Sample",
//         margin: { t: 0 },
//         hovermode: "closest",
//         xaxis: { title: "OTU ID" },
//         margin: { t: 30}
//       };
//       let bubbleData = [
//         {
//           x: otu_ids,
//           y: sample_values,
//           text: otu_labels,
//           mode: "markers",
//           marker: {
//             size: sample_values,
//             color: otu_ids,
//             colorscale: "Earth"
//           }
//         }
//       ];
  
//       Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
//       let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
//       let barData = [
//         {
//           y: yticks,
//           x: sample_values.slice(0, 10).reverse(),
//           text: otu_labels.slice(0, 10).reverse(),
//           type: "bar",
//           orientation: "h",
//         }
//       ];
  
//       let barLayout = {
//         title: "Top 10 Bacteria Cultures Found",
//         margin: { t: 30, l: 150 }
//       };
  
//       Plotly.newPlot("bar", barData, barLayout);
//     });
//   }
  
//   function init() {
//     // Grab a reference to the dropdown select element
//     let selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
//       let sampleNames = data.names;
  
//       for (let i = 0; i < sampleNames.length; i++){
//         selector
//           .append("option")
//           .text(sampleNames[i])
//           .property("value", sampleNames[i]);
//       };
  
//       // Use the first sample from the list to build the initial plots
//       let firstSample = sampleNames[0];
//       ChartBuilder(firstSample);
//       buildMetadata(firstSample);
//     });
//   }
  
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     ChartBuilder(newSample);
//     buildMetadata(newSample);
//   }
  
//   // Initialize the dashboard
//   init();
  

// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// hw

// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:
// hw

// Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file
// */


//initialize the function 
function initialize(){
        //call chart builder function 
        ChartBuilder(495);
        
    };
  
}
initialize();
