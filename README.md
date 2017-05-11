# a3-software-design

### Reusable Network Graph

#### Sample data:
```
{
  "nodes": [
    {
      "id": 1,
      "name": "A",
      "v1": 1,
      "v2": 60
    },
    {
      "id": 2,
      "name": "B",
      "v1": 2,
      "v2": 70
    },
    {
      "id": 3,
      "name": "C",
      "v1": 1,
      "v2": 80
    },
    {
      "id": 4,
      "name": "D",
      "v1": 2,
      "v2": 90
    },
    {
      "id": 5,
      "name": "E",
      "v1": 1,
      "v2": 100
    }
  ],
  "links": [

    {
      "source_id": 1,
      "target_id": 2,
      "weight": 2
    },
    {
      "source_id": 1,
      "target_id": 5,
      "weight": 1
    },
    {
      "source_id": 2,
      "target_id": 3,
      "weight": 1
    },
    {
      "source_id": 3,
      "target_id": 4,
      "weight": 1
    },
    {
      "source_id": 4,
      "target_id": 5,
      "weight": 1
    }
  ]
}
```

#### Methods:
- nodeSize (default = "v1")
	- Set the node attribute which will determine the size of the node.
- nodeSizeMultiplier (default = 10)
	- Set the multiplier of the nodeSize attribute (should probably aim for attribute * multiplier to be 0-100).
- linkSize (default = "weight")
	- Set the link attribute which will determine the thickness of the link.
- linkSizeMultiplier (default = 1.5)
	- Set the multiplier of the linkSize attribute (should probably aim for attribute * multiplier to be 0-5).
- nodeAttraction (default = -4)
	- This value determines forces between nodes. From the d3 api reference, "A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge" (this value should be between -10 and 10).