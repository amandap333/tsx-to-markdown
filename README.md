1. find the file ( glob ) *
2. read *
3. tested file was correctly *
4. find the variables *
5. optional or required *
6. import the usage example from stories.tsx
7. import the import example


1. __get_props_block: "export type LoadingProps = { color: Color, size?: string, [other:string]: unknown }"
2. get_props(): "color: Color, size?: string, [other:string]: unknown"

3. ["color: Color", " size?: string", " [other:string]: unknown"]
4. [["color", "Color"], ["size?", "string"], ["[other", "string]", "unknown"]]
   - remove string and [ from other
5. [["color", "Color"], ["size?", "string"], ["[other:string]", "unknown"]]
6. props = [
        {
            name: 'color',
            type: Color,
            required: true
        },
        {
            name: 'size',
            type: string,
            required: false
        },
        {
            name: 'other',
            type: unknown,
            required: false
        },
   ]

   required_props = list(props.filter(lambda x: x.required, props))
   optional_props = list(props.filter(lambda x: not x.required, props))





<ComponentName
    color={Color},
    size=""
/>

<ComponentName
    color={Color},
    size=""
>
  { children }
</ComponentName>