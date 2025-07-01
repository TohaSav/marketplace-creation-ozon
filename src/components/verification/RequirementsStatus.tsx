import React from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { RequirementCheck } from "@/types/verification";
import { formatRequirementValue } from "@/utils/verificationUtils";

interface RequirementsStatusProps {
  requirements: RequirementCheck[];
}

const RequirementsStatus: React.FC<RequirementsStatusProps> = ({
  requirements,
}) => {
  return (
    <div>
      <h4 className="font-medium mb-3">Соответствие требованиям</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {requirements.map((check) => (
          <div key={check.id} className="flex items-center gap-2 text-sm">
            <Icon
              name={check.met ? "CheckCircle" : "XCircle"}
              size={16}
              className={check.met ? "text-green-600" : "text-red-600"}
            />
            <span className="text-gray-600">{check.name}:</span>
            <span
              className={
                check.met
                  ? "text-green-700 font-medium"
                  : "text-red-700 font-medium"
              }
            >
              {formatRequirementValue(check)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsStatus;
