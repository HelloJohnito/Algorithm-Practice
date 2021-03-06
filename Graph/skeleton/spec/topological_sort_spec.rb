require 'rspec'
require 'topological_sort'

describe 'TopologicalSort' do
  let(:v1) { Vertex.new("1") }
  let(:v2) { Vertex.new("2") }
  let(:v3) { Vertex.new("3") }
  let(:v4) { Vertex.new("4") }
  let(:vertices) { [] }

  before(:each) do
    vertices.push(v1, v2, v3, v4)
    Edge.new(v1, v2)
    Edge.new(v1, v3)
    Edge.new(v2, v4)
    Edge.new(v3, v4)
  end

  it "sorts the vertices" do
    solutions = [
      [v1, v2, v3, v4],
      [v1, v3, v2, v4]
    ]

    1.times do
      expect(solutions).to include(topological_sort(vertices.shuffle))
    end
  end
end
