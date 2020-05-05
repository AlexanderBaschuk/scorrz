import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import serializer from "jest-emotion";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
