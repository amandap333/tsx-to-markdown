# VerticalCard

## Usage

`
<VerticalCard>  
  <img  
    src='https://media.bscs.org/bscs-design-system/example_images/yellow-flower.jpg'  
    className="rounded-t-md lg:rounded-t-lg h-full w-full object-cover"  
    style={{  
      maxHeight: '225px'  
    }}  
  />  
  <VerticalCardBody>  
    <Tag color="red">Leadership Work</Tag>  
    <Tag color="orange">Professional Learning</Tag>  
    <Tag color="yellow">Announcement</Tag>  
    <Tag color="green">Citizen Science</Tag>  
    <Tag color="blue">Instructional Materials Development</Tag>  
    <Tag color="indigo">Instructional Materials Development</Tag>  
    <Tag color="violet">Classroom Instruction</Tag>  
    <h2 className="text-bscs-gray-800 text-xl mt-5 leading-tight">Online Resources During COVID-19 Shutdown</h2>  
    <p className="text-bscs-gray-600 mb-3 mt-3 tracking-wider">  
      Invitations to Inquiry are instructional activities designed to help middle and high school students work with community and citizen science data. The data are from a range of projects hosted on BSCS’s interactive platform, FieldScope.  
    </p>  
    <div className="flex justify-end w-full mt-6">  
      <Button size="sm">Read More</Button>  
    </div>  
  </VerticalCardBody>  
</VerticalCard>  
`

### List of Props
#### Required
*None*
#### Optional
1. children **Recommended** it is highly recommended the component
`VerticalCardBody` is passed in as a child component and that component has
children like in the example above.

2. className:  
Any additional `classNames`.

3. ...other
