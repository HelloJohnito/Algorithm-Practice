require_relative 'graph'

# Implementing topological sort using both Khan's and Tarian's algorithms

def topological_sort(vertices)
  sorted = []
  top = Queue.new
  in_edge_count = {}

  vertices.each do |vertex|
    if vertex.in_edges.empty?
      top.enq(vertex)
    end
    in_edge_count[vertex] = vertex.in_edges.length
  end

  until top.empty?
    current = top.pop
    sorted.push(current)
    current.out_edges.each do |edge|
      in_edge_count[edge.to_vertex] -= 1
      if in_edge_count[edge.to_vertex] == 0
        top.enq(edge.to_vertex)
      end
    end
  end

  return sorted
end


# def topological_sort(vertices)
#   sorted = []
#   top = Queue.new
#   # in_edge_count = {}
#
#   vertices.each do |vertex|
#     if vertex.in_edges.empty?
#       top.enq(vertex)
#     end
#     # in_edge_count[vertex] = vertex.in_edges.length
#   end
#
#   until top.empty?
#     current = top.pop
#     sorted.push(current)
#     # puts current.out_edges.length
#     current.out_edges.each do |edge|
#       # puts edge.to_vertex.value
#       # puts current.out_edges.count
#       destination = edge.to_vertex
#       # puts "#{destination.value}"
#       edge.destroy!
#
#       if destination.in_edges.empty?
#         # puts "#{destination.value}"
#         top.enq(destination)
#       end
#     end
#   end
#
#   return sorted
# end
