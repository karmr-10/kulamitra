
"use client";

import { Home, User, Users } from "lucide-react";

interface MemberData {
  name: string;
  fatherName: string;
  motherName: string;
}

interface FamilyData {
  familyHead: string;
  familyMembers: MemberData[];
}

interface TreeNode {
  name: string;
  children: TreeNode[];
}

function buildTree(familyData: FamilyData): TreeNode {
    // This is a simplified tree building logic for visualization.
    // A more complex logic would be needed for multi-generational trees.
    const headNode: TreeNode = { name: familyData.familyHead, children: [] };
    
    const members = familyData.familyMembers.filter(m => m.name.toLowerCase() !== familyData.familyHead.toLowerCase());
    
    // Simple logic: Assume family head is a parent to all other members listed.
    headNode.children = members.map(member => ({
        name: member.name,
        children: []
    }));
    
    return headNode;
}


const TreeNodeComponent = ({ node }: { node: TreeNode }) => {
    return (
      <li className="relative">
        <div className="flex items-center justify-center">
          <div className="rounded-lg border bg-card p-3 shadow-sm flex items-center gap-2 min-w-[150px] justify-center">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm text-card-foreground">{node.name}</span>
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <ul className="flex justify-center gap-4 pt-8 before:content-[''] before:absolute before:left-1/2 before:top-0 before:w-px before:h-8 before:bg-border">
            {node.children.map((child, index) => (
                 <TreeNodeComponent key={index} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
};


export const FamilyTree = ({ familyData }: { familyData: FamilyData }) => {
  const tree = buildTree(familyData);

  return (
    <div className="p-4 rounded-lg bg-muted/50 overflow-x-auto">
      <ul className="flex justify-center">
        <TreeNodeComponent node={tree} />
      </ul>
    </div>
  );
};
