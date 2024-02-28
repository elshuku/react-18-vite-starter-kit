import {useEffect, useState} from "react";
import fetchData from "./data.ts";
import './styles.css';

const TreeNode = ({id, name, children, isOpen}) => {
  const [isNodeOpen, setNodeOpen] = useState(false)
  const hasChildren = children?.length;
  const toggle = isNodeOpen ? '▼' : hasChildren > 0 ? '▶' : '•';
  const toggleNode = (e) => {
    e.preventDefault();
    if (hasChildren) {
      setNodeOpen(!isNodeOpen);
    }
  }

  return <>
    <li key={id}><span onClick={toggleNode}>{toggle}</span> {name}
      {isNodeOpen && children?.length && <ul>
        {children.map(child => <TreeNode id={child.id} name={child.name}
                                         children={child.children}
                                         isOpen={isNodeOpen}
        />)}
      </ul>}
    </li>
  </>
}

const PageTree = () => {
  const [tree, setTree] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const loadTree = async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        setTree(data);
        setLoading(false);
        console.log(data);
      } catch (ex) {
        setLoading(false)
        setTree(null);
        setError(ex);
      }
    }

    void loadTree();
  }, []);

  const treeIsReady = !isLoading && !error && tree;

  return <section>
    {error && <aside className="error">{error}</aside>}
    {treeIsReady && <ul>
      {tree.map(node => <TreeNode id={node.id} name={node.name} children={node.children}
                                  isOpen={node?.children?.length > 0}/>)
      }
    </ul>}
  </section>;
}

export default PageTree;